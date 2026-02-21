let contentData = [];

async function loadContentData() {
  try {
    const response = await fetch("../assets/data/content.json");

    if (!response.ok) {
      throw new Error("Could not load content.json");
    }

    contentData = await response.json();

    console.log("Content loaded:", contentData);

    return contentData;

  } catch (error) {
    console.error("Error loading data:", error);
    return [];
  }
}
