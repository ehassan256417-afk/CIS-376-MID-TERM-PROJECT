// auth.js
// Handles login check, session state, and logout

function isAuthN() {
  return sessionStorage.getItem("isAuthN") === "true";
}

// Call this in protected pages (app.html, data.html)
function requireAuthN() {
  if (!isAuthN()) {
    window.location.assign("./login.html");
  }
}

function logout() {
  sessionStorage.clear();
  window.location.assign("../index.html");
}

