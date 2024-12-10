export async function changeNewsMood(data) {
  try {
    const response = await fetch("http://localhost:4040/api/mood", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data), // Send title and description to backend
    });

    if (!response.ok) {
      throw new Error("Failed to change mood");
    }

    return await response.json(); // Return the updated article from the backend
  } catch (error) {
    console.error("Error in changeMood:", error);
    return {
      title: data.title,
      description: data.description,
      moodScore: data.moodScore,
    }; // Return original data on failure
  }
}
