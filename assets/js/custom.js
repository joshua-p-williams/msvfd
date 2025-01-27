/*
* Dark Mode Toggle Script
* This script allows users to toggle between light and dark themes.
* It saves the user's preference in localStorage and applies it on page load.
* It also respects the user's system preference for dark mode.
* The script uses Bootstrap's data attributes to manage themes.
* The script is executed when the DOM content is fully loaded.
*/
document.addEventListener("DOMContentLoaded", function () {
    const rootElement = document.documentElement;
    const themeDropdownItems = document.querySelectorAll("#darkModeToggle .dropdown-item");

    // Get the 
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

/*
* Animation on Scroll Script
* This script adds animation classes to elements when they come into view.
* It uses Intersection Observer for performance.
* The script is executed when the DOM content is fully loaded.
*/
document.addEventListener("DOMContentLoaded", function () {
    const animatedElements = document.querySelectorAll(".animate__animated");

    // Create an Intersection Observer
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const animation = element.getAttribute("data-animation");
                    element.classList.add(animation); // Add the animation class
                    observer.unobserve(element); // Stop observing once animated
                }
            });
        },
        {
            threshold: 0.2, // Trigger when 20% of the element is visible
        }
    );

    // Observe each animated element
    animatedElements.forEach((element) => observer.observe(element));
});


/*
* Navigation Scroll Animation Script
* This script animates the navbar on scroll.
* It hides the navbar when scrolling down and shows it when scrolling up.
* The script is executed when the DOM content is fully loaded.
*/
document.addEventListener("DOMContentLoaded", function () {
    let lastScrollTop = 0;
    const navbar = document.querySelector(".scrolling-navbar");

    window.addEventListener("scroll", function () {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
            // Scrolling down
            navbar.style.top = "-70px"; // Adjust height as needed
        } else {
            // Scrolling up
            navbar.style.top = "0";
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Avoid negative values
    });
});
