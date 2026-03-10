// auth.js
// Handles login check, session state, and logout

function isAuthN() { // check if user is authenticated 
// The isAuthN function checks if the user is authenticated by retrieving the value of "isAuthN" from sessionStorage and comparing it to the string "true". If the value is "true", it returns true, indicating that the user is authenticated; otherwise, it returns false. This function is used to determine whether a user has successfully logged in and can access protected pages.
  return sessionStorage.getItem("isAuthN") === "true";
}

// Call this in protected pages (app.html, data.html)
function requireAuthN() {
  if (!isAuthN()) {
    window.location.assign("./login.html");
  }
}
// Call this on logout button
// The logout function clears all data from sessionStorage, effectively logging the user out, and then redirects the user to the index.html page. This ensures that any authenticated state or user information stored in sessionStorage is removed, preventing unauthorized access to protected pages after logout.
function logout() {
  sessionStorage.clear();
  window.location.assign("../index.html");
}

