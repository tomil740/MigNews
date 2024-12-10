export async function getTitleMood(titles) {
  try {
    const response = await fetch("http://localhost:4040/api/mood", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titles }), // Send titles to backend
    });
    console.log("myResponse", response);
    if (!response.ok) {
      throw new Error("Failed to process title mood");
    }

    const data = await response.json();
    console.log("myResponseData", data);

    return data.sentimentScores; // Return the scores from the backend
  } catch (error) {
    console.error("Error in processTitleMood:", error);
    return titles.map(() => null); // Return null for each title on failure
  }
}
