import { useRecoilCallback } from "recoil";
import { newsDataState } from "../../domain/repoStates/newsDataState"; // Your Recoil state
import { getNews } from "../remote/getNews";
import { getTitleMood } from "../remote/getTitleMood";

const NEWS_CACHE_KEY = "localNewsCache"; // Key for local storage

// Custom hook to sync data with the news API and mood data
export function useSyncNewData() {
  return useRecoilCallback(({ set }) => async () => {
    // Set loading state
    set(newsDataState, (prevState) => ({
      ...prevState,
      loading: true,
      error: null, 
    }));

    try {
      // Fetch the news data
      const newsApiData = await getNews();

      // Map to extract titles
      const titlesArray = newsApiData.map((item) => item.title);

      // Fetch mood scores for titles
      const moodArr = await getTitleMood(titlesArray);
      const moodArrData = moodArr.sentences;

      // Combine the original data with the mood scores
      const res = newsApiData.map((item, index) => ({
        ...item,
        moodScore: moodArrData[index]?.sentiment_score || 4, // Adding sentiment score or default 4
      }));

      // Persist to local storage
      localStorage.setItem(NEWS_CACHE_KEY, JSON.stringify(res));

      // Update Recoil state
      set(newsDataState, { data: res, loading: false, error: null });
    } catch (error) {
      console.error("Error syncing new data:", error);

      // Fallback to cached data
      const cachedData = localStorage.getItem(NEWS_CACHE_KEY);
      if (cachedData) {
        set(newsDataState, {
          data: JSON.parse(cachedData),
          loading: false,
          error: error.message,
        });
      } else {
        set(newsDataState, (prevState) => ({
          ...prevState,
          loading: false,
          error: error.message,
        }));
      }
    }
  });
}
