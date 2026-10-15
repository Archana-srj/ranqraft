document.addEventListener("DOMContentLoaded", () => {
  // Keep the copyright year current.
  const year = document.getElementById("currentYear");
  if (year) year.textContent = new Date().getFullYear();

  // Back-to-top control.
  const backToTop = document.getElementById("backToTop");
  const updateBackToTop = () => {
    if (backToTop) backToTop.classList.toggle("show", window.scrollY > 500);
  };
  window.addEventListener("scroll", updateBackToTop, { passive: true });
  updateBackToTop();
  if (backToTop) backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  // Close mobile navigation after choosing a section.
  const nav = document.getElementById("mainNav");
  if (nav && window.bootstrap) {
    nav.querySelectorAll("a.nav-link, a.btn").forEach(link => {
      link.addEventListener("click", () => {
        if (window.matchMedia("(max-width: 991.98px)").matches) {
          const collapse = bootstrap.Collapse.getInstance(nav);
          if (collapse) collapse.hide();
        }
      });
    });
  }

  // Demo contact form: open WhatsApp with a prefilled message.
  // Replace this with a server-side form/API if you need to store enquiries.
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const name = document.getElementById("name").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const service = document.getElementById("service").value;
      const message = `Hello Ranqraft, I would like to enquire about your services.\n\nName: ${name}\nPhone: ${phone}\nService: ${service}`;
      const url = `https://wa.me/919140271496?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank", "noopener,noreferrer");
    });
  }
});
