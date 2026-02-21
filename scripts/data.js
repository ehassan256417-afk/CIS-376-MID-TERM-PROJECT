document.addEventListener("DOMContentLoaded", function () {

  // Protect page
  requireAuthN();

  const output = document.getElementById("sessionOutput");
  const clearBtn = document.getElementById("clearSessionBtn");

  // Collect sessionStorage data
  const sessionData = {};

  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    sessionData[key] = sessionStorage.getItem(key);
  }

  // Display formatted JSON
  output.textContent = JSON.stringify(sessionData, null, 2);

  // Clear session
  clearBtn.addEventListener("click", function () {
    sessionStorage.clear();
    window.location.assign("./login.html");
  });

});