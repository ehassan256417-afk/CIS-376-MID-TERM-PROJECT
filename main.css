document.addEventListener("DOMContentLoaded", function () {

  // Protect page // (bonus: move to separate file and reuse in data.html) // The requireAuthN function is called at the beginning of the DOMContentLoaded event listener to ensure that the user is authenticated before allowing access to the page. If the user is not authenticated, they will be redirected to the login page. This function serves as a gatekeeper for protected pages, ensuring that only authenticated users can access them.
  requireAuthN();

  const output = document.getElementById("sessionOutput");
  const clearBtn = document.getElementById("clearSessionBtn");

  // Collect sessionStorage data // The code iterates through all the keys in sessionStorage and constructs an object called sessionData that contains key-value pairs of all the data stored in sessionStorage. This allows the application to easily access and display the session data in a structured format.
  const sessionData = {};
// The code iterates through all the keys in sessionStorage using a for loop, retrieves each key and its corresponding value, and stores them in the sessionData object. This allows the application to have a complete representation of the session data, which can be used for various purposes such as displaying it to the user or performing operations based on the stored session information.
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    sessionData[key] = sessionStorage.getItem(key);
  }

  // Display formatted JSON  // The sessionData object, which contains all the key-value pairs from sessionStorage, is converted into a formatted JSON string using JSON.stringify with a spacing of 2 for better readability. This formatted JSON string is then assigned to the textContent of the output element, allowing it to be displayed on the page in a clear and organized manner.
  // // The sessionData object, which contains all the key-value pairs from sessionStorage, is converted into a formatted JSON string using JSON.stringify with a spacing of 2 for better readability. This formatted JSON string is then assigned to the textContent of the output element, allowing it to be displayed on the page in a clear and organized manner.
  output.textContent = JSON.stringify(sessionData, null, 2);

  // Clear session // The clearBtn is an event listener that listens for a click event. When the button is clicked, it clears all data from sessionStorage using sessionStorage.clear() and then redirects the user to the login page (login.html) using window.location.assign. This effectively logs the user out and prevents access to protected pages until they log in again.
  clearBtn.addEventListener("click", function () { 
    sessionStorage.clear();
    window.location.assign("./login.html");
  });
  
});