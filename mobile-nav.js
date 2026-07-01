/* ============================================================
   Waslat — mobile navigation drawer
   Builds a hamburger + slide-in drawer on pages that have a
   full .nav-links menu (which CSS hides at <=768px). The drawer
   is cloned from the page's own nav, so each page stays in sync
   automatically. No-ops on pages without .nav-links.
   ============================================================ */
(function () {
  "use strict";

  function init() {
    var nav = document.querySelector("nav");
    if (!nav || nav.dataset.mobileNav === "1") return;

    var links = nav.querySelector(".nav-links");
    if (!links) return; // simple headers (blog / legal) don't need a drawer
    nav.dataset.mobileNav = "1";

    var navRight = nav.querySelector(".nav-right");
    var isRTL =
      document.documentElement.dir === "rtl" ||
      document.body.classList.contains("ar") ||
      document.dir === "rtl";

    /* ---- Hamburger button ---- */
    var burger = document.createElement("button");
    burger.className = "nav-burger";
    burger.type = "button";
    burger.setAttribute("aria-label", isRTL ? "القائمة" : "Menu");
    burger.setAttribute("aria-expanded", "false");
    burger.innerHTML = "<span></span>";
    if (navRight) navRight.appendChild(burger);
    else nav.appendChild(burger);

    /* ---- Overlay ---- */
    var overlay = document.createElement("div");
    overlay.className = "nav-drawer-overlay";

    /* ---- Drawer ---- */
    var drawer = document.createElement("aside");
    drawer.className = "nav-drawer";
    drawer.setAttribute("aria-hidden", "true");
    drawer.setAttribute("role", "dialog");
    drawer.setAttribute("aria-modal", "true");

    var closeLbl = isRTL ? "إغلاق" : "Close";

    var head = document.createElement("div");
    head.className = "nav-drawer-head";
    head.innerHTML =
      '<span style="font-weight:800;font-family:inherit;color:#fff">Waslat</span>' +
      '<button class="nav-drawer-close" type="button" aria-label="' +
      closeLbl +
      '">&times;</button>';
    drawer.appendChild(head);

    /* Cloned navigation links (incl. flattened mega menu) */
    var linksWrap = document.createElement("nav");
    linksWrap.setAttribute("aria-label", isRTL ? "تنقّل" : "Mobile");
    linksWrap.innerHTML = links.innerHTML;
    // Strip list styling artifacts from cloned <ul>/<li>
    Array.prototype.forEach.call(linksWrap.querySelectorAll("ul,li"), function (el) {
      el.style.listStyle = "none";
      el.style.margin = "0";
      el.style.padding = "0";
    });
    drawer.appendChild(linksWrap);

    /* Action buttons + language toggle, cloned from nav-right */
    var actions = document.createElement("div");
    actions.className = "nav-drawer-actions";
    if (navRight) {
      var lang = navRight.querySelector(".lang-toggle");
      if (lang) {
        var langClone = lang.cloneNode(true);
        langClone.style.justifyContent = "center";
        langClone.style.alignSelf = "center";
        langClone.style.marginBottom = "4px";
        actions.appendChild(langClone);
      }
      Array.prototype.forEach.call(
        navRight.querySelectorAll(".btn-ghost, .btn-primary"),
        function (btn) {
          if (btn === burger) return;
          actions.appendChild(btn.cloneNode(true));
        }
      );
    }
    if (actions.children.length) drawer.appendChild(actions);

    document.body.appendChild(overlay);
    document.body.appendChild(drawer);

    /* ---- Open / close ---- */
    function open() {
      overlay.classList.add("open");
      drawer.classList.add("open");
      document.body.classList.add("nav-drawer-locked");
      burger.setAttribute("aria-expanded", "true");
      drawer.setAttribute("aria-hidden", "false");
    }
    function close() {
      overlay.classList.remove("open");
      drawer.classList.remove("open");
      document.body.classList.remove("nav-drawer-locked");
      burger.setAttribute("aria-expanded", "false");
      drawer.setAttribute("aria-hidden", "true");
    }
    function toggle() {
      drawer.classList.contains("open") ? close() : open();
    }

    burger.addEventListener("click", toggle);
    overlay.addEventListener("click", close);
    head.querySelector(".nav-drawer-close").addEventListener("click", close);
    drawer.addEventListener("click", function (e) {
      var a = e.target.closest("a");
      if (a && a.getAttribute("href")) close();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && drawer.classList.contains("open")) close();
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 768 && drawer.classList.contains("open")) close();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
