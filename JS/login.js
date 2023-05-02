"use strict";

async function loginUser(event) {
    event.preventDefault();

    try {

        let username = getElement("#username").value;
        let password = getElement("#password").value;

        const requestBody = {
            username: username,
            password: password
        };

        const post = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody),
        };

        let response = await fetch("/PHP/login.php", post);
        let data = await response.json();

        console.log(response);

        if (!response.ok) {
            displayDatabaseMessage(data);
        } else {
            // add localstorage here
            createDiscoverPage(username);
        }
    } catch (error) {
        console.log(error)
        alert("Oops, something went wrong. Please try again later.");
    }
}

// Login user listener
const loginUserListener = () => {
    const loginForm = document.querySelector("#loginForm");
    loginForm.addEventListener("submit", (event) => {
        loginUser(event);
    });
};

function createLoginPage() {
    main.innerHTML = `
    <div class ="center">
    <h2>Login</h2>
    <p id=message></p>
    <form id=loginForm>
        <div class="txt_field">
            <input type=text id=username placeholder=Username>
        </div>
        <div class="txt_field">
            <input type=password id=password placeholder=Password>
        </div>
        <button type=submit>Login</button>
    </form>
    <button id=register>New to this? Sign up for free</button>
 `;
    // redirect to register page instead
    addEventListenerById("register", "click", createRegisterPage);
    loginUserListener();
}



