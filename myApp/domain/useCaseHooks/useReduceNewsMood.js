import { useState, useCallback } from "react";
import { changeNewsMood } from "../../data/remote/chagneNewsMood"; // Adjust the path as needed

export function useReduceMood() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [updatedItem, setUpdatedItem] = useState(null);

  const reduceMood = useCallback(async (newsItem) => {
    if (!newsItem) {
      setError("Invalid news item");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Prepare data for the API
      const requestData = {
        id: newsItem.id,
        title: newsItem.title,
        description: newsItem.text, // Assuming "text" is the main content
        moodScore: Math.max(newsItem.moodScore - 1, 0), // Ensure moodScore is not negative
      };

      const updatedNews = await changeNewsMood(requestData);
      console.log("working", updatedNews)
      // Update state with the modified article
      setUpdatedItem(updatedNews);
    } catch (err) {
      setError(err.message || "Failed to update mood score");
    } finally {
      setLoading(false);
    }
  }, []);

  return { reduceMood, loading, error, updatedItem };
}
