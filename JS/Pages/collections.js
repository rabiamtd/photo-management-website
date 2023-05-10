"use strict";
const profileMain = document.querySelector("main");
const profileHeader = document.querySelector("header");

// creates dom elements
async function createProfileCollectionsPage(user) {
  setupPage();
  // display photos
  // profileCollectionsPhotos();
  addEventListeners();
  addEventListeners();

  function setupPage() {
    setElementAttributes(profileMain, "profile-main", "profile-page");
    clearElementAttributes(profileHeader);

    // NOTE: current profile page needs to be marked in css
    profileHeader.innerHTML = `
  <H1>PHOTO MANAGEMENT</H1>
    <nav>
      <button id="discover-button">Discover</button>
      <button id="logout-button">Logout</button>
  </nav>
  `;
    profileMain.innerHTML = `
    <section id="collections-section-one" class="section">
      <!-- Insert user profile photo here -->
      <div id="profile-picture" class="profile-photo">-user profile photo here</div>

      <div id="home-photos" class="api-photos"></div>

      <nav>
        <button id="collections-button">Your Collections</button>      
        <button id="gallery-button">Profile</button>      
      </nav>
    </section>

  <section id="collections-section-two" class="section">
  </section>`;
  }

  async function profileCollectionsPhotos() {
    // check if current page is profile page
    const profilePage = document.getElementById("profile-main");
    if (profilePage) {
      await displayCuratedPhotos(2, "portrait");
      await displaySearchTermPhotos(2, "portrait");
    }
  }

  function addEventListeners() {
    document
      .getElementById("gallery-button")
      .addEventListener("click", function () {
        createProfileGalleryPage(user);
      });

    document
      .getElementById("discover-button")
      .addEventListener("click", function () {
        createDiscoverPage(user);
      });

    document
      .getElementById("logout-button")
      .addEventListener("click", function () {
        localStorage.removeItem("user");
        user = null;
        createHomePage();
      });
  }
}

fetch("../JSON/users.json")
  .then((response) => response.json())
  .then((data) => {
    const saved_photos = data[0].saved_photos;
    const container = document.createElement("div");
    //Lägg till klassen api-photos
    container.id = "photo_container";
    const grid_container = document.createElement("div");
    grid_container.id = "grid_container";
    console.log(data);

    saved_photos.forEach((photo) => {
      const photo_url = photo.photoObject.photo;
      console.log(photo_url);
      const img = document.createElement("img");
      const delete_button = document.createElement("button");
      delete_button.textContent = "DELETE";
      delete_button.addEventListeners("click", delete_photo);
      img.src = photo_url;
      container.appendChild(img);
      container.appendChild(delete_button);
    });
    container.appendChild(grid_container);
    //Fråga Rabia om queryselectorn som skapas med innerHTML
    document.querySelector("body").appendChild(container);
  });
