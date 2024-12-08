import { useRecoilState } from "recoil";
import { useNewsById } from "../../domain/useCase/useNewsById";
import { useEffect, useState } from "react";
import { itemUiState } from "./ItemUiState";
import { changeMood } from "../../data/remoteDao/getGemini";

export function useItemVm(itemId) {
  const [uiState, setUiState] = useRecoilState(itemUiState);
  const [article, setArticle] = useState(() => ({
    title: uiState.title || "",
    description: uiState.description || "",
    moodScore: uiState.moodScore || null,
  }));
  const [loadingMood, setLoadingMood] = useState(false); // Local state to track mood update loading

  const updateMood = async () => {
    setLoadingMood(true); // Set loading to true when updating mood
    try {
      const { title, description, moodScore } = await changeMood({
        title: article.title,
        description:
          article.description || article.summary || "No description available",
        moodScore: article.moodScore,
      });

      // Update local article state
      setArticle({ title, description, moodScore });
    } catch (error) {
      console.error("Error updating mood:", error);
    } finally {
      setLoadingMood(false); // Set loading to false after mood update is done
    }
  };

  const { newsItem, error } = useNewsById(itemId);

  useEffect(() => {
    if (newsItem) {
      // Update both local and global states when data is fetched
      setArticle((prevState) => ({
        ...prevState,
        title: newsItem.title,
        description: newsItem.description,
        moodScore: newsItem.moodScore || null,
      }));

      setUiState((prevState) => ({
        ...prevState,
        loading: false, // Set loading to false when data is fetched
        error: null,
        theItem: newsItem,
      }));
    }

    if (error) {
      // Handle error state
      setUiState((prevState) => ({
        ...prevState,
        loading: false,
        error,
      }));
    }

    // Handle loading state when newsItem is still fetching
    if (!newsItem && !error) {
      setUiState((prevState) => ({
        ...prevState,
        loading: true, // Set loading state when no newsItem and no error
      }));
    }
  }, [newsItem, error, setUiState]);

  return { uiState, article, updateMood, loadingMood };
}
