// Dynamic HTML includes
customElements.define("include-html", class extends HTMLElement {
  async connectedCallback() {
    const src = this.getAttribute("src");
    this.innerHTML = await (await fetch(src)).text();
    setActiveNav();
  }
});

function setActiveNav() {
  const page = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("nav a").forEach((a) => {
    const href = a.getAttribute("href");
    if (href === page || (page === "" && href === "index.html")) {
      a.classList.add("active");
    }
  });
}

// Scroll reveal via IntersectionObserver
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08, rootMargin: "0px 0px -48px 0px" }
);

function observeRevealElements() {
  document.querySelectorAll(".reveal, .stagger").forEach((el) => {
    revealObserver.observe(el);
  });
}

document.addEventListener("DOMContentLoaded", observeRevealElements);
