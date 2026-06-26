# Webchat for waslat.io — Design Spec

**Date:** 2026-06-26
**Status:** Approved design, pre-implementation
**Spans two repos:** `waslat-landing` (visitor widget) and `ecolor-fixed` (agent inbox + Firestore rules)

## Goal

Add a custom-built live chat to the **waslat.io** marketing site. Visitors chat from a
floating widget; **human agents** on the Waslat team read and reply from an inbox inside the
existing app at **app.waslat.io**. No third-party chat service.

## Key decisions (locked)

| Decision | Choice |
| --- | --- |
| Chat type | Custom-built |
| Who answers | Human agents (team) |
| Realtime + storage | Reuse existing **Firestore** (named DB `ai-studio-d1b78403-…`) |
| Transport | Widget talks **directly to Firestore** via anonymous auth (no messaging server) |
| Agent inbox location | New protected route inside `ecolor-fixed` (app.waslat.io) |
| Inbox access | Super admin **+ staff role** |
| Pre-chat form | Required: **name + email/phone** before chat opens |
| Notifications | **In-app only** — live inbox, unread badge, sound (no email/WhatsApp/push for v1) |
| Widget scope (v1) | Branded, focused: bubble + pre-chat form + live thread + EN/AR RTL. **No** typing indicators, file upload, emoji, or resume-previous for v1 |
| Bilingual | EN on `/`, AR + RTL on `/ar`, mirroring the existing `body.ar` toggle |

## Architecture

```
waslat.io (static)                 Firestore (existing DB)            app.waslat.io (React)
┌──────────────────┐               ┌─────────────────────┐           ┌──────────────────────┐
│ chat-widget.js   │  anon auth +  │ webchatConversations│  live     │ /admin/livechat      │
│ (bubble + panel) │ ─realtime──▶  │   /{convId}         │ listener  │  inbox: list + thread│
│ EN on / , AR /ar │  read/write   │   /messages/{msgId} │ ◀───────  │  agent replies here  │
└──────────────────┘               └─────────────────────┘           └──────────────────────┘
```

### Component 1 — Visitor widget (`waslat-landing`)

- Files: `chat-widget.js` (ES module, loads Firebase web SDK from gstatic CDN — no build step)
  and `chat-widget.css`. A small `<script type="module" src="/chat-widget.js">` include is
  added to every marketing page (`index.html`, `ar/index.html`, `contact.html`, `docs.html`,
  `support.html`, `privacy.html`, `terms.html`, and the `ar/` equivalents).
- Behavior:
  1. Floating bubble bottom-corner (left in RTL, right in LTR).
  2. On open → **pre-chat form**: name (required) + email **or** phone (at least one, validated).
  3. On submit → `signInAnonymously()`, create `webchatConversations/{convId}` with visitor info
     and `visitorUid = auth.uid`, then show the live thread.
  4. Visitor types → write to `…/messages`; subscribe via `onSnapshot` to render agent replies live.
- Language: reads the existing `body.ar` class to pick Arabic copy + `dir="rtl"`; fonts Syne (en) /
  Cairo (ar); theme dark `#050508`, accent baby-blue `#7DD3FC`.
- Offline note: if no agent has replied / team away, show "We're away — we'll reply to your email."
  Message is still stored; nothing lost.

### Component 2 — Agent inbox (`ecolor-fixed`)

- New protected route `/admin/livechat`, guarded for **super_admin + staff role** (reuse existing
  `AuthContext` role model; mirror an existing protected-route guard).
- Two-pane UI: conversation list (newest first, unread badge + notification sound on new message)
  and a thread pane to read history and send replies (`sender: 'agent'`, `agentUid`).
- Pure Firestore `onSnapshot` listeners — no new backend endpoints.
- Marks `unreadForAgent` / conversation `status` as agents read and close threads.

### Component 3 — Firestore data model (new, isolated top-level collections)

- `webchatConversations/{convId}`:
  `{ visitorUid, name, email?, phone?, lang, status: 'open'|'closed', createdAt,
     lastMessageAt, lastMessagePreview, unreadForAgent }`
- `webchatConversations/{convId}/messages/{msgId}`:
  `{ sender: 'visitor'|'agent', text, createdAt, agentUid? }`
- `convId` generated client-side; `visitorUid` = anonymous auth uid.

### Component 4 — Security rules (`ecolor-fixed/firestore.rules`)

Add a new scoped match block; **do not loosen any existing tenant rule**. Default-deny stays.

- Anonymous visitor:
  - may **create** `webchatConversations/{convId}` only when
    `request.resource.data.visitorUid == request.auth.uid`.
  - may **read** that conversation and **read/create** its `messages` only when
    `resource.data.visitorUid == request.auth.uid` (or, for message creation, the parent
    conversation's `visitorUid == request.auth.uid` and `sender == 'visitor'`).
  - may **not** read or list any other conversation.
- Team (super_admin + staff): may read/write all `webchatConversations/**`.
- Setup step: add **`waslat.io`** (and `www.waslat.io`) to Firebase Auth **authorized domains**
  so anonymous auth works from the marketing origin. The widget uses the project's public web
  config (`firebase-applet-config.json` equivalent — public keys, secured by rules).

## Error handling

- Pre-chat validation: name required; at least one of email/phone, format-checked, before submit.
- Network/offline: Firestore SDK queues writes offline and retries; widget shows a non-blocking
  "reconnecting…" state and the away note when relevant.
- Auth failure: if `signInAnonymously()` fails, show a retry message; do not create a conversation.
- Rules deny (defense in depth): treated as a soft error in the widget with a generic failure note.

## Testing

- **Rules** (Firebase emulator unit tests): visitor cannot read another visitor's conversation or
  list the collection; visitor can read/write only their own; agent (super_admin + staff) can read
  all; existing tenant collections remain unaffected (regression check).
- **Widget** (manual, EN + AR/RTL): bubble open/close, form validation, send/receive, offline note,
  reconnect, language + RTL correctness.
- **Inbox** (two-browser end-to-end): visitor sends → agent sees live + sound/badge → agent replies
  → visitor sees live; unread/close state updates.

## Out of scope for v1 (YAGNI)

Typing indicators, file/image upload, emoji picker, resume-previous-conversation, email/WhatsApp/
push agent alerts, AI auto-answers, canned responses, analytics dashboard. Each can be layered on
later without changing the v1 data model.
