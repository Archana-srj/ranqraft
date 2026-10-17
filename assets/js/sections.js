(() => {
  const main = document.getElementById("main");
  const placeholders = [...document.querySelectorAll("[data-include]")];

  const loadSections = async () => {
    const sections = await Promise.all(placeholders.map(async placeholder => {
      const path = placeholder.dataset.include;
      const response = await fetch(path);
      if (!response.ok) {
        throw new Error(`Failed to load ${path}: ${response.status} ${response.statusText}`);
      }
      return response.text();
    }));

    placeholders.forEach((placeholder, index) => {
      placeholder.innerHTML = sections[index];
      placeholder.removeAttribute("data-include");
    });

    main.setAttribute("aria-busy", "false");
    document.dispatchEvent(new Event("sections:loaded"));
  };

  loadSections().catch(error => {
    console.error("Unable to load page sections.", error);
    const message = document.createElement("p");
    message.className = "container py-4 text-danger";
    message.setAttribute("role", "alert");
    message.textContent = "Some page content could not be loaded. Please refresh the page or try again later.";
    main.before(message);
    main.setAttribute("aria-busy", "false");
  });
})();
