import { useRecoilValue } from "recoil";
import { newsItemByIdSelector } from "../../domain/repoStates/newsItemByIdSelctor";

// Custom hook to initialize the news item
export function useInitNewsItem(id) {
  // Extract the news item using the Recoil selector, only if id is provided
  let item = id ? useRecoilValue(newsItemByIdSelector(id)) : null;


  // Function to handle initialization logic
  const initNewsItem = async () => {
    try {
      // If there's no ID or no matched state data, attempt to load from localStorage
      if (!id || item.id!=id || item.id == -1) {
        const savedItem = localStorage.getItem("currentNewsItem");
        if (savedItem) {
          return JSON.parse(savedItem);
        } else {
          throw new Error("No ID provided and no saved item in localStorage.");
        }
      }

      // Clear any previously saved item from localStorage if a valid ID is provided
      localStorage.removeItem("currentNewsItem");

      // If item is fetched from Recoil, save it to localStorage
      if (item) {
        localStorage.setItem("currentNewsItem", JSON.stringify(item));
        return item;
      } else {
        throw new Error("No news item found with the provided ID.");
      }
    } catch (error) {
      console.error("Failed to initialize news item:", error);
      throw error;
    }
  };

  return { initNewsItem, item };
}
