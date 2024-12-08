import { useRecoilValue } from "recoil";
import { newsItemByIdSelector } from "../../data/local/newsItemByIdSelector";



export function useNewsById(newsId) {
  const newsItem = useRecoilValue(newsItemByIdSelector(newsId)); // Retrieve the specific news item
  const error = newsItem ? null : "News item not found"; // Error if the item is not found
  return { newsItem, error };
}


