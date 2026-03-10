document.addEventListener("DOMContentLoaded", async function () {

//  <!  1) protect page <!-- (bonus: move to separate file and reuse in data.html) -->
  requireAuthN();

  // 2) show username <!-- (bonus: also show in data.html) -->
  const username = sessionStorage.getItem("username") || "Unknown";
  document.getElementById("whoami").textContent = username;

  // 3) logout <!-- (bonus: move to separate file and reuse in data.html) -->
  document.getElementById("btnLogout").addEventListener("click", function () {
    logout();
  });

  // 4) load JSON data <!-- (bonus: move to separate file and reuse in data.html) -->
  let data = await loadContentData();
    

  // elements <!-- (bonus: move to separate file and reuse in data.html) -->
  const grid = document.getElementById("cardGrid");
  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("categoryFilter");
  const sortSelect = document.getElementById("sortSelect");
  buildCategories();
// view buttons <!-- (bonus: move to separate file and reuse in data.html) -->
  const gridViewBtn = document.getElementById("gridViewBtn");
const listViewBtn = document.getElementById("listViewBtn");
const resultCount = document.getElementById("resultCount");


// default view (bonus: remember choice) <!-- The viewMode variable is initialized by checking if there is a saved value in sessionStorage under the key "viewMode". If there is a saved value, it will be used; otherwise, it defaults to "grid". This allows the application to remember the user's last selected view mode (grid or list) even after they navigate away from the page or refresh it, as long as the session is active. -->
let viewMode = sessionStorage.getItem("viewMode") || "grid";

// set active button UI <!-- (bonus: move to separate file and reuse in data.html) -->
function syncViewButtons() {
  if (viewMode === "grid") {
    gridViewBtn.classList.add("active");
    listViewBtn.classList.remove("active");
  } else {
    listViewBtn.classList.add("active");
    gridViewBtn.classList.remove("active");
  }
}

// click events <!-- (bonus: move to separate file and reuse in data.html) -->    // When the gridViewBtn is clicked, the viewMode variable is set to "grid", and this choice is saved in sessionStorage under the key "viewMode". The syncViewButtons function is called to update the UI to reflect the active view mode, and then applyAll is called to re-render the content based on the new view mode. Similarly, when the listViewBtn is clicked, the viewMode variable is set to "list", saved in sessionStorage, and the UI and content are updated accordingly.
gridViewBtn.addEventListener("click", () => {
  viewMode = "grid";
  sessionStorage.setItem("viewMode", viewMode);
  syncViewButtons();
  applyAll();
});
// click events <!-- (bonus: move to separate file and reuse in data.html) -->
listViewBtn.addEventListener("click", () => {
  viewMode = "list";
  sessionStorage.setItem("viewMode", viewMode);
  syncViewButtons();
  applyAll();
});

// run once at start <!-- (bonus: move to separate file and reuse in data.html) -->
syncViewButtons();
    
  //  Dynamic categories from JSON <!-- (bonus: move to separate file and reuse in data.html) -->     
// <!-- The buildCategories function extracts unique categories from the loaded data and populates the categoryFilter select element with these categories as options. It also includes an "All categories" option at the top. Additionally, it restores the previously selected category filter from sessionStorage if it exists, allowing the user's filter choice to persist across sessions. -->

  function buildCategories() {
    const categories = Array.from(new Set(data.map(item => item.category))).sort();

    // <! keep only "all" then add dynamic categories
    categoryFilter.innerHTML = `<option value="all">All categories</option>`;
// <! The function first creates a Set from the categories extracted from the data to ensure uniqueness, then converts it back to an array and sorts it. It then sets the innerHTML of the categoryFilter to include the "All categories" option, and iterates over the unique categories to create and append option elements for each category to the select element.
    categories.forEach(cat => {
      const opt = document.createElement("option");
      opt.value = cat;
      opt.textContent = cat;
      categoryFilter.appendChild(opt);
    });

    // restore saved filter (bonus)
    const savedCat = sessionStorage.getItem("categoryFilter") || "all";
    categoryFilter.value = savedCat;
  }
  

  // render function
  function renderCards(list) {
  grid.innerHTML = "";
// The renderCards function takes a list of items and generates HTML cards for each item based on the current view mode (grid or list). It creates a new div element for each item, sets its class based on the view mode, and populates its innerHTML with the item's details such as title, category, rating, description, and a link. Finally, it appends each generated card to the grid container to display them on the page.
  list.forEach(item => {
    const col = document.createElement("div");

    if (viewMode === "list") {
      col.className = "col-12";
    } else {
      col.className = "col-md-4";
    }
// The innerHTML of each card is dynamically generated based on the properties of the item being rendered. It includes the title, category, rating, description, and a link to open the item. The structure of the card is designed to be responsive, with different layouts for grid and list views. The generated card is then appended to the grid container to be displayed on the page.
    col.innerHTML = `
  <div class="card h-100">
    <div class="card-body">
      <h5 class="card-title">${item.title}</h5>
      <p class="card-text text-muted">Category: ${item.category}</p>
      <p class="card-text">Rating: ${item.rating}</p>
      <p class="card-text">${item.description}</p>
      <a class="btn btn-sm btn-outline-primary" 
         href="${item.link}" 
         target="_blank" 
         rel="noopener">
         Open Link
      </a>
    </div>
  </div>
`;

    grid.appendChild(col);
  });
}

  // apply search + filter + sort 
  // (bonus: move to separate file and reuse in data.html) // The applyAll function is responsible for applying the search, filter, and sort functionalities to the data. It retrieves the current values from the search input, category filter, and sort select elements. It then filters the data based on the search query and selected category, and sorts it according to the chosen sorting option. Finally, it updates the result count display and calls renderCards to update the displayed content based on the applied search, filter, and sort criteria.
  function applyAll() {
    const searchText = searchInput.value.trim().toLowerCase();
    const category = categoryFilter.value;
        //  Save filter choice (bonus)
    sessionStorage.setItem("categoryFilter", category);
    const sortValue = sortSelect.value;

    let filtered = [...data];

    // search // The search functionality allows users to filter the displayed content based on a search query. When the user types in the search input, the applyAll function is triggered, which checks if the search text is not empty. If there is a search query, it filters the data array to include only items whose title or description contains the search text (case-insensitive). This enables users to quickly find relevant content by typing keywords related to the title or description of the items.
    if (searchText.length > 0) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchText) ||
        item.description.toLowerCase().includes(searchText)
      );
    }

    // filter // The filtering logic checks if the selected category is not "all". If a specific category is selected, it filters the data array to include only items that belong to the selected category. This allows users to narrow down the displayed content based on their category preference.
    if (category !== "all") {
      filtered = filtered.filter(item => item.category === category);
    }

    // sort // (bonus: move to separate file and reuse in data.html)    
    // The sorting logic checks the value of sortValue and sorts the filtered array accordingly. If sortValue is "rating-desc", it sorts the items in descending order based on their rating. If it's "rating-asc", it sorts in ascending order. For "title-asc" and "title-desc", it sorts the items alphabetically by their title in either ascending or descending order. After sorting, it updates the result count display and re-renders the cards with the sorted list.q
    if (sortValue === "rating-desc") {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortValue === "rating-asc") {
      filtered.sort((a, b) => a.rating - b.rating);
    } else if (sortValue === "title-asc") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortValue === "title-desc") {
      filtered.sort((a, b) => b.title.localeCompare(a.title));
    }
    resultCount.textContent = `${filtered.length} items`;
    renderCards(filtered);
  }

  // events // (bonus: move to separate file and reuse in data.html) 
  // The searchInput, categoryFilter, and sortSelect elements have event listeners attached to them that trigger the applyAll function whenever the user interacts with these controls. This ensures that the displayed content is dynamically updated based on the user's search query, selected category filter, and chosen sorting option.
  searchInput.addEventListener("input", applyAll);
  categoryFilter.addEventListener("change", applyAll);
  sortSelect.addEventListener("change", applyAll);

  // initial render 
  
  applyAll();

});