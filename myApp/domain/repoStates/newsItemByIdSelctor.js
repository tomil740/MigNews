import { selectorFamily } from "recoil";
import { newsDataState } from "./newsDataState";
import NewsItem from "../models/NewsItem";

// Parameterized Selector
export const newsItemByIdSelector = selectorFamily({
  key: "newsItemByIdSelector",
  get:
    (id) =>
    ({ get }) => {
      const state = get(newsDataState);

      if (!state || !Array.isArray(state.data)) {
        console.warn("Invalid state structure or no data available.");
        return null;
      }

      // Find the item by ID
      const item = state.data.find((item) => item.id === id);


      if (!item) {
        console.warn(`No item found with ID: ${id}`);
        return new NewsItem(
          -1,
          "Unknown Title",
          "Unknown Author",
          -1, // Default moodScore
          null, // No text
          "No summary available.",
          null, // No image
          null, // No publish_date
          "Unknown", // No category
          "Unknown", // No language
          null // No sentiment
        );
      }
        console.log("found return the ");

      return new NewsItem(
        item.id,
        item.title || "Unknown Title",
        item.author || "Unknown Author",
        item.moodScore ?? -1,
        item.text || null,
        item.summary || "No summary available.",
        item.image || null,
        item.publish_date || null,
        item.category || "Unknown",
        item.language || "Unknown",
        item.sentiment || null
      );
    },
});
