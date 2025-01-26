document.addEventListener("DOMContentLoaded", function () {
    const rootElement = document.documentElement;
    const themeDropdownItems = document.querySelectorAll(".dropdown-item");
    const savedTheme = localStorage.getItem("theme") || "auto";

    // Set the initial theme
    setTheme(savedTheme);

    // Handle theme changes
    themeDropdownItems.forEach((item) => {
        item.addEventListener("click", function () {
            const selectedTheme = this.getAttribute("data-theme");
            setTheme(selectedTheme);
        });
    });

    function setTheme(theme) {
        // Update the data attribute on the <html> element
        rootElement.setAttribute("data-bs-theme", theme);

        // Mark the active dropdown item
        themeDropdownItems.forEach((item) => {
            if (item.getAttribute("data-theme") === theme) {
                item.classList.add("active");
            } else {
                item.classList.remove("active");
            }
        });

        // Save the preference in localStorage
        localStorage.setItem("theme", theme);

        // Handle "auto" to respect system preferences
        if (theme === "auto") {
            const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            rootElement.setAttribute("data-bs-theme", systemPrefersDark ? "dark" : "light");
        }
    }
});
