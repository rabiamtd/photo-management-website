"use strict";
// Register

function createRegisterPage() {
    main.innerHTML = `
    <h2>Register</h2>
    <p id=message></p>
    <form id=regForm>
        <input type=text id=username placeholder=Username>
        <input type=password id=password placeholder=Password>
        <button type=submit>Register</button>
    </form>
    <button id=login>Already go an account? Login here</button>
 `;

    // redirect to login page if already registered (+ add spicy transitions here)
    document.querySelector("#login").addEventListener("click", () => {
        createLoginPage();
    });

    // register user 
    const regForm = document.querySelector("#regForm");
    regForm.addEventListener("submit", (event) => {
        registerUser(event);
    });

    async function registerUser(event) {
        event.preventDefault();
        /* oliwer säger kom ihåg att fetcha från mappen register.php */

        try {

            let username = document.querySelector("#username").value;
            let password = document.querySelector("#password").value;

            const requestBody = {
                username: username,
                password: password
            };

            const post = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody),
            };

            let response = await fetch("/PHP/register.php", post);
            let data = await response.json();

            console.log(response);

            if (!response.ok) {
                displayDatabaseMessage(data);
            } else {

            }

        } catch (error) {
            console.log(error)
            alert("Oops, something went wrong. Please try again later.");

        }
    }
}

