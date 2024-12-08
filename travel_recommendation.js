//This is all super ugly and written just to pass the assessment instead of being "good"

document.addEventListener("DOMContentLoaded", () => {
  // Select all navigation links and content sections
  const links = document.querySelectorAll(".navlink");
  const sections = document.querySelectorAll(".content");

  // Add click event listeners to navigation links
  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault(); // Prevent default behavior of the link

      // Remove "active" class from all sections
      sections.forEach((section) => section.classList.remove("active"));

      // Get the target section id from the clicked link
      const targetId = this.getAttribute("data-target");

      // Add "active" class to the target section
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.classList.add("active");
        //hide search bar unless we're on the home page
        const searchBar = document.querySelector("#searchbar");
        if (targetSection.id === "home") {
          searchBar.style.display = "block";
        } else {
          searchBar.style.display = "none";
          //reset the searchbar text
          let searchText = document.querySelector("#search");
          searchText.value = "";
        }
      }
    });
  });

  //add event listener to search button
  //this is so bad
  const searchButton = document.querySelector("#searchbutton");
  searchButton.addEventListener("click", function (e) {
    e.preventDefault();
    // Remove "active" class from all sections
    sections.forEach((section) => section.classList.remove("active"));
    // convert input to lowercase to make life easier
    const searchText = document.querySelector("#search").value.toLowerCase();
    let dataReq = "";
    if (!searchText || searchText === "") {
      document.querySelector(".errormsg").classList.add("active");
      //exit early as we don't need to run anything else
      return;
    } else if (searchText.includes("beach")) {
      dataReq = "beaches";
    }
    // countr covers entries of both countries and country
    else if (searchText.includes("countr")) {
      dataReq = "countries";
    } else if (searchText.includes("temple")) {
      dataReq = "temples";
    }
    //if any other word we do not have data for it so exit showing error
    else {
      document.querySelector(".errormsg").classList.add("active");
      //exit early as we don't need to run anything else
      return;
    }
    //fetch and show the data
    const url = "travel_recommendation_api.json";

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        return response.json();
      })
      .then((json) => {
        //display the data
        const data = json[dataReq];
        let searchResults = document.querySelector(".searchresults");
        //remove any data already in search results
        searchResults.replaceChildren();
        let resultDiv = document.createElement("div");
        //go through each result and add to results div
        data.forEach((info) => {
          if (dataReq !== "countries") {
            addData(resultDiv, info);
          } else {
            let title = document.createElement("h3");
            title.textContent = info.name;
            resultDiv.appendChild(title);
            //loop through cities
            let subResultDiv = document.createElement("div");
            info.cities.forEach((city) => {
              addData(subResultDiv, city);
            });
            resultDiv.appendChild(subResultDiv);
          }
        });
        searchResults.appendChild(resultDiv);
        searchResults.classList.add("active");
        console.log(json[dataReq]);
      })
      .catch((error) => {
        console.error(error.message);
      });
  });
});

function addData(resultDiv, info) {
  let img = document.createElement("img");
  img.src = info.imageUrl;
  img.alt = info.name;
  resultDiv.appendChild(img);
  let title = document.createElement("h4");
  title.textContent = info.name;
  resultDiv.appendChild(title);
  let description = document.createElement("p");
  description.textContent = info.description;
  resultDiv.appendChild(description);
}
function clearButton(){
    //clear everything and go back to home page
    const sections = document.querySelectorAll(".content");
    sections.forEach((section) => section.classList.remove("active"));
    const searchResults = document.querySelector(".searchresults");
        //remove any data already in search results
        searchResults.replaceChildren();
        document.getElementById("home").classList.add("active");
        document.querySelector("#search").value = "";
}