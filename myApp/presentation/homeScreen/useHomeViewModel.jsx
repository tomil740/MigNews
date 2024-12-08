import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { homeUiState } from "./HomeUiState";
import useFetchNews from "../../domain/useCase/useFetchNews";

export function useHomeViewModel() {
  // Call the custom hook to fetch news data and manage global state (from Recoil)
  const { newsData, loading, error, retryFetch } = useFetchNews();

  // Get current uiState from Recoil
  const [uiState, setUiState] = useRecoilState(homeUiState);

  useEffect(() => {
    // Log the fetched data (for debugging purposes)
    console.log("Fetched data:", newsData);
    setUiState(newsData)

    if (loading) {
      // If loading, show empty news data
      setUiState({ ...uiState, newsData: [], loading: true, error: null });
    } else if (error) {
      // If there's an error, show an empty news data array and the error message
      setUiState({ ...uiState, newsData: [], loading: false, error: error });
    } else if (newsData && newsData.length > 0) {
      // If there's valid data, update the uiState with the fetched news
      setUiState({
        ...uiState,
        newsData: newsData,
      });
    }
  }, [newsData, loading, error, uiState, setUiState]); // Track loading, data, error changes

  console.log("myUiState",uiState)
  // Return the updated UI state to the component
  return uiState;
}
