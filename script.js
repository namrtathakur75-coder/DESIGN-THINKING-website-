// Campus Compass - simple JavaScript for search, filters and route planning.

const places = [
  { name: "Academic Area", category: "Academic", icon: "▦", description: "Academic blocks and classrooms. Confirm your exact block before travelling.", start: "Academic Area" },
  { name: "Central Library", category: "Academic", icon: "▤", description: "A study and learning space for students.", start: "Central Library" },
  { name: "Department Office", category: "Academic", icon: "▣", description: "For department-related queries and student support.", start: "Academic Area" },
  { name: "Hostel Area", category: "Hostel", icon: "⌂", description: "Student residential area and hostel facilities.", start: "Hostel Area" },
  { name: "Food Court", category: "Food", icon: "♨", description: "Find food and refreshment options around campus.", start: "Food Court" },
  { name: "Cafeteria", category: "Food", icon: "☕", description: "A place to take a break and grab a snack.", start: "Food Court" },
  { name: "Health Centre", category: "Essentials", icon: "✚", description: "For basic medical assistance and health-related needs.", start: "Health Centre" },
  { name: "Main Gate", category: "Essentials", icon: "⇥", description: "A campus entry and exit point.", start: "Main Gate" },
  { name: "Student Help Desk", category: "Essentials", icon: "ⓘ", description: "A suggested point for general student guidance.", start: "Academic Area" }
];

const placeGrid = document.getElementById("placeGrid");
const searchInput = document.getElementById("searchInput");
let selectedCategory = "All";

// Show destination cards on the page.
function showPlaces(list) {
  placeGrid.innerHTML = "";

  if (list.length === 0) {
    placeGrid.innerHTML = "<p>No places found. Try another search.</p>";
    return;
  }

  list.forEach(function(place) {
    const card = document.createElement("article");
    card.className = "place-card";
    card.innerHTML = `
      <div class="place-top">
        <div class="place-icon">${place.icon}</div>
        <span class="place-category">${place.category}</span>
      </div>
      <h3>${place.name}</h3>
      <p>${place.description}</p>
      <button type="button" data-place="${place.start}">Use as destination →</button>
    `;
    placeGrid.appendChild(card);
  });

  // Clicking a card sends its destination to the route planner.
  document.querySelectorAll(".place-card button").forEach(function(button) {
    button.addEventListener("click", function() {
      document.getElementById("endPoint").value = button.dataset.place;
      document.getElementById("routeResult").textContent =
        "Destination selected: " + button.dataset.place + ". Choose your starting point and select Show route.";
      document.getElementById("startPoint").scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });
}

// Search by place name or description.
function filterPlaces() {
  const searchText = searchInput.value.toLowerCase();
  const filtered = places.filter(function(place) {
    const matchesCategory = selectedCategory === "All" || place.category === selectedCategory;
    const matchesSearch = place.name.toLowerCase().includes(searchText) ||
                          place.description.toLowerCase().includes(searchText);
    return matchesCategory && matchesSearch;
  });
  showPlaces(filtered);
}

document.getElementById("searchButton").addEventListener("click", filterPlaces);
searchInput.addEventListener("keyup", filterPlaces);

document.querySelectorAll(".filter").forEach(function(button) {
  button.addEventListener("click", function() {
    document.querySelectorAll(".filter").forEach(function(item) {
      item.classList.remove("active");
    });
    button.classList.add("active");
    selectedCategory = button.dataset.category;
    filterPlaces();
  });
});

// A simple demonstration route message (not live GPS directions).
document.getElementById("routeButton").addEventListener("click", function() {
  const start = document.getElementById("startPoint").value;
  const end = document.getElementById("endPoint").value;
  const result = document.getElementById("routeResult");

  if (start === end) {
    result.textContent = "You are already at " + end + ". Choose a different destination.";
  } else {
    result.textContent = "Demo route: Start at " + start + " and follow the campus direction signs towards " + end + ". Ask the campus help desk or security staff to confirm the exact route. Live map directions are not connected in this prototype.";
  }
});

// Display the names of files selected by the student for project evidence.
document.getElementById("evidenceFiles").addEventListener("change", function() {
  const fileList = document.getElementById("fileList");
  fileList.innerHTML = "";

  if (this.files.length === 0) {
    fileList.textContent = "No files selected yet.";
    return;
  }

  Array.from(this.files).forEach(function(file) {
    const item = document.createElement("div");
    item.textContent = "• " + file.name + " (" + Math.round(file.size / 1024) + " KB)";
    fileList.appendChild(item);
  });
});

// Show all places when the website first opens.
showPlaces(places);