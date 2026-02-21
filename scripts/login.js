document.addEventListener("DOMContentLoaded", function () {

  const loginButton = document.getElementById("login-button");

  loginButton.addEventListener("click", function () {

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    console.log("password is:", password);

    if (password === "lasagna") {

      sessionStorage.setItem("username", username);
      sessionStorage.setItem("isAuthN", "true");

      window.location.assign("app.html");

    } else {
      alert("Wrong password");
    }

  });

});
