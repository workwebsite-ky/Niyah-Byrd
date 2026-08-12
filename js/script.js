/* Hair by niyahhleyy — interactions */
(function () {
  "use strict";

  /* -------- page loader -------- */
  window.addEventListener("load", function () {
    var l = document.querySelector(".loader");
    if (l) setTimeout(function () { l.classList.add("done"); }, 550);
  });

  document.addEventListener("DOMContentLoaded", function () {

    /* -------- sticky nav shadow + mobile menu -------- */
    var nav = document.querySelector(".nav");
    var burger = document.querySelector(".nav__burger");
    if (nav) {
      var onScroll = function () { nav.classList.toggle("is-stuck", window.scrollY > 8); };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }
    if (burger && nav) {
      burger.addEventListener("click", function () {
        var open = nav.classList.toggle("is-open");
        burger.setAttribute("aria-expanded", open ? "true" : "false");
      });
      nav.querySelectorAll(".nav__links a").forEach(function (a) {
        a.addEventListener("click", function () { nav.classList.remove("is-open"); });
      });
    }

    /* -------- scroll reveal -------- */
    var reveals = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window && reveals.length) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
      reveals.forEach(function (el) { io.observe(el); });
    } else {
      reveals.forEach(function (el) { el.classList.add("in"); });
    }

    /* -------- animated counters -------- */
    var counters = document.querySelectorAll("[data-count]");
    if ("IntersectionObserver" in window && counters.length) {
      var co = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          var el = e.target;
          var target = parseFloat(el.getAttribute("data-count"));
          var suffix = el.getAttribute("data-suffix") || "";
          var dur = 1400, start = null;
          function step(ts) {
            if (!start) start = ts;
            var p = Math.min((ts - start) / dur, 1);
            var eased = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.round(target * eased) + suffix;
            if (p < 1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
          co.unobserve(el);
        });
      }, { threshold: 0.6 });
      counters.forEach(function (el) { co.observe(el); });
    }

    /* -------- FAQ accordion -------- */
    document.querySelectorAll(".faq__q").forEach(function (q) {
      q.addEventListener("click", function () {
        var item = q.closest(".faq__item");
        var a = item.querySelector(".faq__a");
        var open = item.classList.toggle("open");
        q.setAttribute("aria-expanded", open ? "true" : "false");
        a.style.maxHeight = open ? a.scrollHeight + "px" : null;
      });
    });

    /* -------- back to top -------- */
    var totop = document.querySelector(".totop");
    if (totop) {
      window.addEventListener("scroll", function () {
        totop.classList.toggle("show", window.scrollY > 600);
      }, { passive: true });
      totop.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    /* -------- contact form -> mailto fallback -------- */
    var form = document.querySelector("#contactForm");
    if (form) {
      form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var name = (form.name.value || "").trim();
        var email = (form.email.value || "").trim();
        var msg = (form.message.value || "").trim();
        var subject = encodeURIComponent("New booking enquiry — " + (name || "Website"));
        var body = encodeURIComponent(
          "Name: " + name + "\nEmail: " + email + "\n\n" + msg
        );
        window.location.href =
          "mailto:NiyahByrd@gmail.com?subject=" + subject + "&body=" + body;
        var ok = form.querySelector(".form-ok");
        if (ok) ok.style.display = "block";
      });
    }

    /* -------- current year -------- */
    var y = document.querySelector("#year");
    if (y) y.textContent = new Date().getFullYear();
  });
})();
