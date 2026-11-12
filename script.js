const $ = s => document.querySelectorAll(s);

/* ---------- MOBILE MENU ---------- */
const toggle = document.querySelector(".nav-toggle");
const menu = document.getElementById("navLinks");
const setMenu = open => {
    menu.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", open);
    toggle.firstElementChild.className = open ? "fas fa-xmark" : "fas fa-bars";
};
toggle.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => setMenu(false)));

/* ---------- ACTIVE LINK WHILE SCROLLING ---------- */
const links = [...menu.querySelectorAll('a[href^="#"]')].filter(a => document.querySelector(a.getAttribute("href")));
const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            links.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + e.target.id));
        }
    });
}, { rootMargin: "-45% 0px -50% 0px" });
links.forEach(l => observer.observe(document.querySelector(l.getAttribute("href"))));

/* ---------- MODALS ---------- */
let lastFocus = null;

function openModal(modal, trigger) {
    lastFocus = trigger;
    modal.classList.add("active");
    document.body.classList.add("modal-open");
    modal.querySelector(".close-modal").focus();
}

function closeModals() {
    $(".modal-overlay.active").forEach(m => m.classList.remove("active"));
    document.body.classList.remove("modal-open");
    if (lastFocus) lastFocus.focus();
}

$(".open-modal").forEach(el => {
    const trigger = el.closest(".card") || el;
    trigger.addEventListener("click", e => {
        e.preventDefault();
        const modal = document.getElementById(el.dataset.modal);
        if (modal) openModal(modal, trigger);
    });
    if (trigger !== el) {               // make the whole card clickable + keyboard friendly
        trigger.classList.add("clickable");
        trigger.tabIndex = 0;
        trigger.setAttribute("role", "button");
        trigger.addEventListener("keydown", e => {
            if (e.key === "Enter" || e.key === " ") { e.preventDefault(); trigger.click(); }
        });
    }
});

$(".close-modal").forEach(b => b.addEventListener("click", closeModals));
$(".modal-overlay").forEach(m => m.addEventListener("click", e => { if (e.target === m) closeModals(); }));
document.addEventListener("keydown", e => { if (e.key === "Escape") { closeModals(); setMenu(false); } });

/* ---------- CONTACT FORM ---------- */
const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");
form.addEventListener("submit", e => {
    e.preventDefault();
    status.textContent = "Thank you for contacting me!";
    form.reset();
    setTimeout(() => { status.textContent = ""; closeModals(); }, 1600);
});

/* ---------- SCROLL PROGRESS, HEADER, BACK TO TOP ---------- */
const header = document.querySelector("header");
const bar = document.getElementById("progress");
const toTop = document.getElementById("toTop");
let ticking = false;
function onScroll() {
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = "scaleX(" + (max > 0 ? scrollY / max : 0) + ")";
    header.classList.toggle("scrolled", scrollY > 20);
    toTop.classList.toggle("show", scrollY > 600);
    ticking = false;
}
addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
onScroll();
toTop.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));

/* ---------- REVEAL ON SCROLL ---------- */
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!reduceMotion) {
    $(".card-container").forEach(c => [...c.children].forEach((el, i) => el.style.setProperty("--d", i * 0.1 + "s")));
    const targets = $(".section h1, .section-content, .card-container > *");
    const revealer = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (!e.isIntersecting) return;
            const el = e.target;
            el.classList.add("in");
            revealer.unobserve(el);
            // hand the element back to its normal hover transitions once revealed
            setTimeout(() => el.classList.remove("reveal", "in"), 1000 + parseFloat(el.style.getPropertyValue("--d") || 0) * 1000);
        });
    }, { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });
    targets.forEach(el => { el.classList.add("reveal"); revealer.observe(el); });
}

/* ---------- CARD SPOTLIGHT (mouse devices) ---------- */
if (matchMedia("(hover: hover)").matches) {
    $(".card").forEach(card => card.addEventListener("pointermove", e => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", e.clientX - r.left + "px");
        card.style.setProperty("--my", e.clientY - r.top + "px");
    }));
}

/* ---------- TYPING ROLES ---------- */
const typed = document.getElementById("typed");
if (typed && !reduceMotion) {
    const roles = ["A Computer Science Student", "SK Treasurer", "A Networking & AI Learner"];
    let r = 0, i = roles[0].length, deleting = false;
    (function tick() {
        const word = roles[r];
        typed.textContent = word.slice(0, i);
        let delay = deleting ? 35 : 75;
        if (!deleting && i === word.length) { deleting = true; delay = 2200; }
        else if (deleting && i === 0) { deleting = false; r = (r + 1) % roles.length; delay = 350; }
        else i += deleting ? -1 : 1;
        setTimeout(tick, delay);
    })();
}

/* ---------- RESUME: view only (no right-click save / drag) ---------- */
$(".no-save").forEach(el => el.addEventListener("contextmenu", e => e.preventDefault()));
