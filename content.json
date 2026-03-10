// login.js
// Handles login form and session state
document.addEventListener("DOMContentLoaded", function () {

  console.log("Demo password: lasagna"); // (bonus: hide in env variable or separate file)

  const loginButton = document.getElementById("login-button");
// The loginButton is an event listener that listens for a click event. When the button is clicked, it retrieves the values entered in the username and password input fields. If the password matches the hardcoded value "lasagna", it stores the username and an authentication flag ("isAuthN") in sessionStorage, and then redirects the user to the app.html page. If the password is incorrect, it displays an alert message indicating that the password is wrong.
  loginButton.addEventListener("click", function () {

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (password === "lasagna") {
// If the password is correct, the username and an authentication flag are stored in sessionStorage. The user is then redirected to the app.html page, which is a protected page that requires authentication. This allows the application to maintain the user's authenticated state across different pages and sessions until they log out or clear their session data.
      sessionStorage.setItem("username", username);
      sessionStorage.setItem("isAuthN", "true");
// The window.location.assign method is used to redirect the user to the app.html page after a successful login. This method changes the current URL to the specified URL, allowing the user to access the protected content of the app.html page. If the password is incorrect, an alert is shown to inform the user of the wrong password.
      window.location.assign("app.html");
// If the password is incorrect, an alert is shown to inform the user of the wrong password.
    } else {
      alert("Wrong password");
    }
// The event listener for the login button is set up to handle the login process when the button is clicked. It checks the entered password against a hardcoded value and manages the session state accordingly, providing feedback to the user based on the success or failure of the login attempt.
  });

});