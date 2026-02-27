document.addEventListener("DOMContentLoaded", async function () {

  // 1) protect page
  requireAuthN();

  // 2) show username
  const username = sessionStorage.getItem("username") || "Unknown";
  document.getElementById("whoami").textContent = username;

  // 3) logout
  document.getElementById("btnLogout").addEventListener("click", function () {
    logout();
  });

  // 4) load JSON data
  let data = await loadContentData();
    

  // elements
  const grid = document.getElementById("cardGrid");
  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("categoryFilter");
  const sortSelect = document.getElementById("sortSelect");
  buildCategories();

  const gridViewBtn = document.getElementById("gridViewBtn");
const listViewBtn = document.getElementById("listViewBtn");
const resultCount = document.getElementById("resultCount");


// default view (bonus: remember choice)
let viewMode = sessionStorage.getItem("viewMode") || "grid";

// set active button UI
function syncViewButtons() {
  if (viewMode === "grid") {
    gridViewBtn.classList.add("active");
    listViewBtn.classList.remove("active");
  } else {
    listViewBtn.classList.add("active");
    gridViewBtn.classList.remove("active");
  }
}

// click events
gridViewBtn.addEventListener("click", () => {
  viewMode = "grid";
  sessionStorage.setItem("viewMode", viewMode);
  syncViewButtons();
  applyAll();
});

listViewBtn.addEventListener("click", () => {
  viewMode = "list";
  sessionStorage.setItem("viewMode", viewMode);
  syncViewButtons();
  applyAll();
});

// run once at start
syncViewButtons();
    
  //  Dynamic categories from JSON
  function buildCategories() {
    const categories = Array.from(new Set(data.map(item => item.category))).sort();

    // keep only "all" then add dynamic categories
    categoryFilter.innerHTML = `<option value="all">All categories</option>`;

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

  list.forEach(item => {
    const col = document.createElement("div");

    if (viewMode === "list") {
      col.className = "col-12";
    } else {
      col.className = "col-md-4";
    }

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
  function applyAll() {
    const searchText = searchInput.value.trim().toLowerCase();
    const category = categoryFilter.value;
        //  Save filter choice (bonus)
    sessionStorage.setItem("categoryFilter", category);
    const sortValue = sortSelect.value;

    let filtered = [...data];

    // search
    if (searchText.length > 0) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchText) ||
        item.description.toLowerCase().includes(searchText)
      );
    }

    // filter
    if (category !== "all") {
      filtered = filtered.filter(item => item.category === category);
    }

    // sort
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

  // events
  searchInput.addEventListener("input", applyAll);
  categoryFilter.addEventListener("change", applyAll);
  sortSelect.addEventListener("change", applyAll);

  // initial render
  applyAll();

});