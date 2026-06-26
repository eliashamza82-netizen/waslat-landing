import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getAuth, signInAnonymously } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { getFirestore, collection, doc, setDoc, addDoc, updateDoc, onSnapshot,
  query, orderBy, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

// PUBLIC web config — copied verbatim from ecolor-fixed/firebase-applet-config.json
const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyBxh4Rk0wZDEhEM2RZwQELldmFiuoobioU',
  authDomain: 'ai-studio-applet-webapp-d88eb.firebaseapp.com',
  projectId: 'ai-studio-applet-webapp-d88eb',
  appId: '1:724795846382:web:0b003fee8d4232f067cdff',
  storageBucket: 'ai-studio-applet-webapp-d88eb.firebasestorage.app',
  messagingSenderId: '724795846382',
  measurementId: '',
};
const DB_ID = 'ai-studio-d1b78403-cac5-4602-8b14-ecc98ba689a7';

const AR = document.body.classList.contains('ar');
const T = AR ? {
  bubble: '💬', title: 'الدردشة مع واسلات', name: 'الاسم', contact: 'البريد الإلكتروني أو الهاتف',
  start: 'ابدأ المحادثة', placeholder: 'اكتب رسالتك…', send: 'إرسال',
  needName: 'الرجاء إدخال اسمك', needContact: 'الرجاء إدخال بريد إلكتروني أو رقم هاتف صحيح',
  error: 'حدث خطأ ما. حاول مرة أخرى.',
  away: 'فريقنا غير متصل الآن — سنرد عليك عبر بريدك الإلكتروني.',
} : {
  bubble: '💬', title: 'Chat with Waslat', name: 'Name', contact: 'Email or phone',
  start: 'Start chat', placeholder: 'Type your message…', send: 'Send',
  needName: 'Please enter your name', needContact: 'Please enter a valid email or phone',
  error: 'Something went wrong. Please try again.',
  away: "We're away right now — we'll reply to your email.",
};

const app = initializeApp(FIREBASE_CONFIG);
const auth = getAuth(app);
const db = getFirestore(app, DB_ID);

// Safety note: all values interpolated below come from the hardcoded T constant
// (no user-supplied data), so innerHTML is safe here — no XSS vector.
const root = document.createElement('div');
root.innerHTML = `
  <button id="wc-bubble" aria-label="${T.title}">${T.bubble}</button>
  <div id="wc-panel" dir="${AR ? 'rtl' : 'ltr'}">
    <div id="wc-head">${T.title}</div>
    <form id="wc-form">
      <input id="wc-name" placeholder="${T.name}" autocomplete="name">
      <input id="wc-contact" placeholder="${T.contact}" autocomplete="email">
      <div class="wc-err" id="wc-formerr"></div>
      <button type="submit">${T.start}</button>
    </form>
    <div id="wc-body" style="display:none"></div>
    <div id="wc-foot" style="display:none">
      <input id="wc-input" placeholder="${T.placeholder}">
      <button id="wc-send">${T.send}</button>
    </div>
  </div>`;
document.body.appendChild(root);

const $ = (id) => root.querySelector(id);
$('#wc-bubble').onclick = () => $('#wc-panel').classList.toggle('open');

function validContact(v) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v) || /^[+]?[\d\s-]{7,}$/.test(v);
}

let convId = null;
let unsubscribe = null;
$('#wc-form').onsubmit = async (e) => {
  e.preventDefault();
  const name = $('#wc-name').value.trim();
  const contact = $('#wc-contact').value.trim();
  const err = $('#wc-formerr');
  if (!name) { err.textContent = T.needName; return; }
  if (!validContact(contact)) { err.textContent = T.needContact; return; }
  err.textContent = '';
  const isEmail = contact.includes('@');
  try {
    const cred = await signInAnonymously(auth);
    convId = doc(collection(db, 'webchatConversations')).id;
    await setDoc(doc(db, 'webchatConversations', convId), {
      visitorUid: cred.user.uid, name,
      email: isEmail ? contact : null, phone: isEmail ? null : contact,
      lang: AR ? 'ar' : 'en', status: 'open',
      createdAt: serverTimestamp(), lastMessageAt: serverTimestamp(),
      lastMessagePreview: '', unreadForAgent: true,
    });
    $('#wc-form').style.display = 'none';
    $('#wc-body').style.display = 'flex';
    $('#wc-foot').style.display = 'flex';
    const note = document.createElement('div'); note.className = 'wc-note'; note.textContent = T.away;
    $('#wc-body').appendChild(note);
    subscribe();
  } catch (e2) {
    err.textContent = T.error;
    console.error('[webchat]', e2);
  }
};

function subscribe() {
  if (unsubscribe) unsubscribe();
  const q = query(collection(db, 'webchatConversations', convId, 'messages'), orderBy('createdAt', 'asc'));
  unsubscribe = onSnapshot(q, (snap) => {
    const body = $('#wc-body');
    body.querySelectorAll('.wc-msg').forEach((n) => n.remove());
    snap.docs.forEach((d) => {
      const m = d.data();
      const el = document.createElement('div');
      el.className = 'wc-msg ' + (m.sender === 'agent' ? 'agent' : 'visitor');
      el.textContent = m.text;
      body.appendChild(el);
    });
    body.scrollTop = body.scrollHeight;
  });
}

async function sendMsg() {
  const input = $('#wc-input');
  const text = input.value.trim();
  if (!text || !convId) return;
  input.value = '';
  try {
    await addDoc(collection(db, 'webchatConversations', convId, 'messages'), {
      sender: 'visitor', text, createdAt: serverTimestamp(),
    });
    await updateDoc(doc(db, 'webchatConversations', convId), {
      lastMessageAt: serverTimestamp(), lastMessagePreview: text, unreadForAgent: true,
    });
  } catch (e) {
    console.error('[webchat] send failed', e);
    input.value = text;
  }
}
$('#wc-send').onclick = sendMsg;
$('#wc-input').addEventListener('keydown', (e) => { if (e.key === 'Enter') sendMsg(); });
