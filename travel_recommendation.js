document.addEventListener('DOMContentLoaded', () => {
    // Select all navigation links and content sections
    const links = document.querySelectorAll(".navlink");
    const sections = document.querySelectorAll(".content");

    // Add click event listeners to navigation links
    links.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault(); // Prevent default behavior of the link

            // Remove "active" class from all sections
            sections.forEach(section => section.classList.remove("active"));

            // Get the target section id from the clicked link
            const targetId = this.getAttribute("data-target");

            // Add "active" class to the target section
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add("active");
                //hide search bar unless we're on the home page
                const searchBar = document.querySelector("#searchbar");
                if (targetSection.id === "home"){ 
                    searchBar.style.display = "block";
                }
                else {
                    searchBar.style.display = "none";
                }
                console.log(searchBar);
            }
        });
    });
});
