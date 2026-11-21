/*
 * MAIN SCRIPT (no libraries, works offline, works when opened by double-click)
 * 1. Language switch (Bangla / English), texts come from js/i18n.js
 * 2. Umrah checklist (tick items, progress bar + counter)
 * 3. Contact form (opens WhatsApp with the message pre-filled)
 */
(function () {
  "use strict";
  var CFG = window.SITE || {};
  var I = window.I18N;
  var lang = "bn";
  var root = document.documentElement;

  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }
  function bnDigits(n) { return String(n).replace(/[0-9]/g, function (d) { return "\u09E6\u09E7\u09E8\u09E9\u09EA\u09EB\u09EC\u09ED\u09EE\u09EF".charAt(d); }); }

  /* ---------- 1. language ---------- */
  function applyLang(l) {
    lang = l === "en" ? "en" : "bn";
    root.lang = lang;
    var i, el, t;
    var els = document.querySelectorAll("[data-i18n]");
    for (i = 0; i < els.length; i++) {
      el = els[i]; t = I.text[el.getAttribute("data-i18n")];
      if (t) el.textContent = t[lang];
    }
    els = document.querySelectorAll("[data-i18n-attr]");
    for (i = 0; i < els.length; i++) {
      el = els[i];
      el.getAttribute("data-i18n-attr").split(";").forEach(function (pair) {
        var p = pair.split(":"); t = I.text[p[1]];
        if (t) el.setAttribute(p[0], t[lang]);
      });
    }
    var btns = document.querySelectorAll(".lang button");
    for (i = 0; i < btns.length; i++) {
      var on = btns[i].getAttribute("data-lang") === lang;
      btns[i].classList.toggle("on", on);
      btns[i].setAttribute("aria-pressed", on ? "true" : "false");
    }
    updateChecklist();
  }

  document.addEventListener("click", function (e) {
    var b = e.target.closest ? e.target.closest(".lang button") : null;
    if (!b) return;
    var l = b.getAttribute("data-lang");
    applyLang(l);
    if (CFG.rememberLanguage !== false) store("lang", l);
  });

  /* ---------- 2. checklist ---------- */
  var items = document.querySelectorAll(".ck");
  var bar = document.getElementById("chk-bar");
  var count = document.getElementById("chk-count");

  function updateChecklist() {
    if (!items.length) return;
    var done = 0, i;
    for (i = 0; i < items.length; i++) if (items[i].classList.contains("on")) done++;
    if (bar) bar.className = "bar w" + done;
    if (count) {
      var d = lang === "bn" ? bnDigits(done) : done, n = lang === "bn" ? bnDigits(items.length) : items.length;
      count.textContent = I.ui[lang].checkCount.replace("{done}", d).replace("{total}", n);
    }
  }
  var saved = [];
  try { saved = JSON.parse(store("checklist") || "[]"); } catch (e) { saved = []; }
  Array.prototype.forEach.call(items, function (el, i) {
    if (saved.indexOf(i) > -1) { el.classList.add("on"); el.setAttribute("aria-checked", "true"); }
    el.addEventListener("click", function () {
      var on = !el.classList.contains("on");
      el.classList.toggle("on", on);
      el.setAttribute("aria-checked", on ? "true" : "false");
      var list = [];
      Array.prototype.forEach.call(items, function (x, j) { if (x.classList.contains("on")) list.push(j); });
      store("checklist", JSON.stringify(list));
      updateChecklist();
    });
  });

  /* ---------- 3. contact form ---------- */
  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = document.getElementById("form-status");
      var name = form.elements.name, phone = form.elements.phone;
      var ui = I.ui[lang];
      name.classList.toggle("bad", !name.value.trim());
      phone.classList.toggle("bad", !phone.value.trim());
      if (!name.value.trim() || !phone.value.trim()) {
        status.className = "fine form-status err"; status.textContent = ui.formNeed; return;
      }
      var msg = ui.waGreeting + "\n" + ui.waName + ": " + name.value.trim() + "\n" + ui.waPhone + ": " + phone.value.trim() +
        "\n" + ui.waInterest + ": " + form.elements.interest.value +
        (form.elements.message.value.trim() ? "\n" + ui.waMsg + ": " + form.elements.message.value.trim() : "");
      status.className = "fine form-status"; status.textContent = ui.formOpening;
      window.open("https://wa.me/" + CFG.whatsapp + "?text=" + encodeURIComponent(msg), "_blank", "noopener");
    });
  }

  /* ---------- start ---------- */
  var start = CFG.defaultLanguage || "bn";
  if (CFG.rememberLanguage !== false) start = store("lang") || start;
  var q = /[?&]lang=(bn|en)/.exec(location.search);
  if (q) start = q[1];
  applyLang(start);
})();
