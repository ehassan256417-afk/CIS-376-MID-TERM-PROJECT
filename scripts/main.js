// main.js
// Handles loading content data from JSON file
let contentData = [];
// The loadContentData function is an asynchronous function that fetches data from a JSON file located at "../assets/data/content.json". It uses the Fetch API to make a GET request to the specified URL. If the response is successful (response.ok), it parses the response as JSON and assigns it to the contentData variable. If there is an error during the fetch operation, it catches the error, logs it to the console, and returns an empty array. This function allows the application to load content data dynamically from an external source, which can then be used to populate the UI with relevant information.
async function loadContentData() {
  try {
    const response = await fetch("../assets/data/content.json");
  // If the response is not successful, an error is thrown with a message indicating that the content.json file could not be loaded. This ensures that any issues with fetching the data are properly handled and logged for debugging purposes.
    if (!response.ok) {
      throw new Error("Could not load content.json");
    }
// If the response is successful, the content is parsed as JSON and assigned to the contentData variable. The loaded content data is also logged to the console for verification. Finally, the function returns the loaded content data, which can be used elsewhere in the application to populate the UI or perform other operations based on the retrieved data.
    contentData = await response.json();

    console.log("Content loaded:", contentData);
// The loaded content data is also logged to the console for verification. Finally, the function returns the loaded content data, which can be used elsewhere in the application to populate the UI or perform other operations based on the retrieved data.
    return contentData;
// If there is an error during the fetch operation, it catches the error, logs it to the console, and returns an empty array. This function allows the application to load content data dynamically from an external source, which can then be used to populate the UI with relevant information.
  } catch (error) {
    console.error("Error loading data:", error);
    return [];
  }
}
// The loadContentData function is an asynchronous function that fetches data from a JSON file located at "../assets/data/content.json". It uses the Fetch API to make a GET request to the specified URL. If the response is successful (response.ok), it parses the response as JSON and assigns it to the contentData variable. If there is an error during the fetch operation, it catches the error, logs it to the console, and returns an empty array. This function allows the application to load content data dynamically from an external source, which can then be used to populate the UI with relevant information.