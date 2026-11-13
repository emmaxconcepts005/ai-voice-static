// Animated voice waveforms
document.querySelectorAll(".wave").forEach(function (w) {
  var n = parseInt(w.getAttribute("data-bars") || "40", 10);
  for (var i = 0; i < n; i++) {
    var b = document.createElement("b");
    b.style.setProperty("--i", i);
    b.style.setProperty("--h", 22 + Math.abs(Math.sin(i * 0.7) * 58 + Math.cos(i * 1.9) * 18));
    w.appendChild(b);
  }
});

// Mobile menu
var menuBtn = document.querySelector(".menu-btn");
var nav = document.getElementById("site-nav");
if (menuBtn && nav) {
  menuBtn.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("open")) {
      nav.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
      menuBtn.focus();
    }
  });
}

// Reveal on scroll
var els = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
    });
  }, { rootMargin: "0px 0px -8% 0px" });
  els.forEach(function (el) { io.observe(el); });
} else {
  els.forEach(function (el) { el.classList.add("in"); });
}

// Year in footer
var y = document.getElementById("year");
if (y) y.textContent = new Date().getFullYear();

// Contact form (Formspree)
var fm = document.getElementById("f");
if (fm) fm.addEventListener("submit", async function (e) {
  e.preventDefault();
  var f = fm.elements, note = document.getElementById("note"), btn = fm.querySelector("button[type=submit]");
  if (!f["name"].value.trim() || !/^\S+@\S+\.\S+$/.test(f["email"].value)) {
    note.textContent = "Enter your name and a valid email address, then send again.";
    (f["name"].value.trim() ? f["email"] : f["name"]).focus();
    return;
  }
  btn.disabled = true; note.textContent = "Sending...";
  try {
    var r = await fetch(fm.action, { method: "POST", body: new FormData(fm), headers: { Accept: "application/json" } });
    if (r.ok) { fm.reset(); note.textContent = "Thanks, your message was sent. I'll reply by email or WhatsApp."; }
    else {
      var j = await r.json().catch(function () { return {}; });
      note.textContent = (j.errors && j.errors.map(function (x) { return x.message; }).join(" ")) || "Something went wrong. Please try again, or message me on WhatsApp.";
    }
  } catch (_) {
    note.textContent = "The message could not be sent. Check your connection, or email or message me on WhatsApp.";
  }
  btn.disabled = false;
});
