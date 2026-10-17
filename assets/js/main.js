document.addEventListener("sections:loaded", () => {
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

  // The footer is fetched as HTML, so its accordion behavior is initialized here.
  document.querySelectorAll(".footer-accordion").forEach(accordion => {
    const trigger = accordion.querySelector(".footer-trigger");
    const content = accordion.querySelector(".footer-content");
    const icon = accordion.querySelector(".footer-icon");

    if (!trigger || !content || !icon) return;

    trigger.addEventListener("click", () => {
      if (window.innerWidth >= 1024) return;

      const isOpen = trigger.getAttribute("aria-expanded") === "true";
      document.querySelectorAll(".footer-accordion").forEach(item => {
        const itemTrigger = item.querySelector(".footer-trigger");
        const itemContent = item.querySelector(".footer-content");
        const itemIcon = item.querySelector(".footer-icon");
        if (!itemTrigger || !itemContent || !itemIcon) return;

        itemTrigger.setAttribute("aria-expanded", "false");
        itemContent.classList.add("hidden");
        itemIcon.textContent = "+";
      });

      if (!isOpen) {
        trigger.setAttribute("aria-expanded", "true");
        content.classList.remove("hidden");
        icon.textContent = "−";
      }
    });
  });

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



  const yearElement = document.getElementById("currentYear");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }


  
(() => {
  function initHeader() {
    const servicesItem = document.getElementById("servicesItem");
    const servicesToggle = document.getElementById("servicesToggle");
    const servicesMenu = document.getElementById("servicesMenu");

    const navToggle = document.getElementById("navToggle");
    const mobileNav = document.getElementById("mobileNav");
    const openIcon = document.getElementById("menuOpenIcon");
    const closeIcon = document.getElementById("menuCloseIcon");

    const mobileServicesToggle =
      document.getElementById("mobileServicesToggle");
    const mobileServicesMenu =
      document.getElementById("mobileServicesMenu");
    const mobileServicesArrow =
      document.getElementById("mobileServicesArrow");

    if (
      !servicesItem ||
      !servicesToggle ||
      !servicesMenu ||
      !navToggle ||
      !mobileNav
    ) return;

    if (servicesItem.dataset.initialized === "true") return;
    servicesItem.dataset.initialized = "true";

    const desktop = window.matchMedia("(min-width: 1024px)");

    let mobileOpen = false;
    let mobileServicesOpen = false;
    let desktopClickOpen = false;

    /* DESKTOP SERVICES */
    function setDesktopServices(open) {
      desktopClickOpen = open;
      servicesItem.classList.toggle("is-open", open);
      servicesToggle.setAttribute("aria-expanded", String(open));
    }

    /* MOBILE SERVICES ACCORDION */
    function setMobileServices(open) {
      mobileServicesOpen = open;

      mobileServicesMenu?.classList.toggle("hidden", !open);
      mobileServicesToggle?.setAttribute(
        "aria-expanded",
        String(open)
      );
      mobileServicesArrow?.classList.toggle("rotate-180", open);
    }

    /* MOBILE NAVIGATION */
    function setMobileNav(open) {
      mobileOpen = open;

      mobileNav.classList.toggle("hidden", !open);
      navToggle.setAttribute("aria-expanded", String(open));
      navToggle.setAttribute(
        "aria-label",
        open ? "Close navigation" : "Open navigation"
      );

      openIcon?.classList.toggle("hidden", open);
      closeIcon?.classList.toggle("hidden", !open);

      if (!open) setMobileServices(false);
    }

    /* DESKTOP HOVER */
    servicesItem.addEventListener("mouseenter", () => {
      if (desktop.matches) {
        servicesItem.classList.add("is-open");
        servicesToggle.setAttribute("aria-expanded", "true");
      }
    });

    servicesItem.addEventListener("mouseleave", () => {
      if (desktop.matches) setDesktopServices(false);
    });

    /* DESKTOP CLICK / KEYBOARD */
    servicesToggle.addEventListener("click", (event) => {
      if (!desktop.matches) return;

      event.stopPropagation();
      setDesktopServices(!desktopClickOpen);
    });

    /* MOBILE HAMBURGER */
    navToggle.addEventListener("click", () => {
      setMobileNav(!mobileOpen);
    });

    /* MOBILE SERVICES CLICK */
    mobileServicesToggle?.addEventListener("click", () => {
      setMobileServices(!mobileServicesOpen);
    });

    /* CLOSE ON OUTSIDE CLICK */
    document.addEventListener("click", (event) => {
      if (!servicesItem.contains(event.target)) {
        setDesktopServices(false);
      }

      if (
        mobileOpen &&
        !mobileNav.contains(event.target) &&
        !navToggle.contains(event.target)
      ) {
        setMobileNav(false);
      }
    });

    /* ESCAPE KEY */
    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;

      setDesktopServices(false);

      if (mobileOpen) {
        setMobileNav(false);
        navToggle.focus();
      }
    });

    /* CLOSE MOBILE MENU ON NAVIGATION */
    mobileNav.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", () => setMobileNav(false));
    });

    /* CLOSE DESKTOP DROPDOWN ON LINK CLICK */
    servicesMenu.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", () => setDesktopServices(false));
    });

    /* RESET WHEN BREAKPOINT CHANGES */
    desktop.addEventListener("change", () => {
      setDesktopServices(false);
      setMobileNav(false);
    });

    /* INITIAL STATE */
    setDesktopServices(false);
    setMobileNav(false);
    setMobileServices(false);
  }

  document.addEventListener("sections:loaded", initHeader, { once: true });
})();
    