"use strict";
const profilePageMain = document.querySelector("main");
const profilePageHeader = document.querySelector("header");

async function createProfileGalleryPage(user) {
  setupPage();
  addEventListeners();

  function setupPage() {
    clearElementAttributes(profilePageMain);
    setElementAttributes(profilePageMain, "profile-main", "user-page-main");
    setElementAttributes(
      profilePageHeader,
      "profile-header",
      "user-page-header"
    );
    // NOTE: current profile page needs to be marked in css

    profilePageHeader.innerHTML = `
    <H1>P</H1>
      <nav>
        <button id="discover-button">Discover</button>
        <button id="upload-button">Upload</button>
        <button id="logout-button">Logout</button>
      </nav>
  `;

    profilePageMain.innerHTML = `
    <!-- Insert user profile section here -->
    <section id="profile-section-one" class="section user-section-one">
    <div id="profile-bar">
    <div id="profile-picture" class="profile-photo">insert user profile photo here</div>
    <button>"Change photo" form goes here</button>
    <h3>username placeholder: ${user.username}</h3>
    </div> 
    </section >
  

      <section id="profile-section-two" class="section user-section-two">
      <nav class="profile-or-collections-nav">
      <button id="collections-button">Your Collections</button>      
      <button id="profile-button">Profile</button>      
    </nav>

        <div id="profile-photos" class="user-photos"></div>
      </section>
    `;
  }

  // append to profile bar area:
  profilePageHeader.innerHTML = `
  <form id="form_upload" action="../PHP/profile.php" method="POST" enctype="multipart/form-data">
    <input type="file" name="upload">
    <button type="submit">Upload</button>
  </form>
  <div id="result"></div>
  `;
  const result = document.getElementById("result");
  const form = document.getElementById("form_upload");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    // Remove previously uploaded image

    const formData = new FormData(form);
    const request = new Request("../PHP/upload.php", {
      method: "POST",
      body: formData,
    });

    fetch(request)
      .then((response) => response.json())
      .then((data) => {
        // This simply resets the form.
        form.reset();
        console.log(data);

        if (data.error) {
          result.textContent = "An error occurred: " + data.error;
        } else {
          result.textContent = "Successfully uploaded the image";
          fetch("../JSON/users.json")
            .then((response) => response.json())
            .then((data) => {
              const uploaded_photos = data[0].uploaded_photos;
              const container = document.createElement("div");
              //Lägg till klassen api-photos
              container.id = "photo_container";
              const grid_container = document.createElement("div");
              grid_container.id = "grid_container";
              console.log(data);

              uploaded_photos.forEach((photo) => {
                const photo_url = photo.photo;
                const img = document.createElement("img");
                img.src = photo_url;
                container.appendChild(img);
              });
              container.appendChild(grid_container);
              //Fråga Rabia om queryselectorn som skapas med innerHTML
              document.querySelector("body").appendChild(container);
            });
        }
      });
  });

  function addEventListeners() {
    document
      .getElementById("collections-button")
      .addEventListener("click", function () {
        createProfileCollectionsPage(user);
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

//Display all images that are saved from discover

//Display all images that you have uploaded

//This php-code should is intended for index.html

// $filename = "photo.json";
// $photos = [];

// if (file_exists($filename)) {
//     $json = file_get_contents($filename);
//     $photos = json_decode($json, true);
// }

// foreach ($photos as $photo) {
//     $src = $photo["src"];
//     echo "<img src='$src'>";
// }

//Display your profile picture
