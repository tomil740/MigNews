import { useRecoilState, useRecoilValue } from "recoil";
import {
  localDataFetch,
  loadingAtom,
  errorAtom,
} from "../../data/local/localDataState";
import { useEffect, useState } from "react";
import getNews from "../../data/remoteDao/getNews";
import { processTitleMood } from "../../data/remoteDao/getGemini";


export default function useFetchNews() {
    // Using useRecoilState for setting state, but use useRecoilValue to get current value
    const [newsData, setNewsData] = useRecoilState(localDataFetch);
    const loading = useRecoilValue(loadingAtom);
    const error = useRecoilValue(errorAtom);

    // State to manage retry attempts
    const [retryCount, setRetryCount] = useState(0);

    const fetchData = async () => {
      try {
    setNewsData({ loading: true, data: [], error: null }); // Set loading state immediately

    // Fetch the news data
    const data = await getNews();

    // Map to extract titles
    const myMatchedArr = data.map(item => item.title);

    // Process the titles and get mood scores
    const data2 = await processTitleMood(myMatchedArr);
    const sentimentScores = data2.sentences; // Assuming 'sentences' is the array with mood scores

    // Combine the original data with the mood scores
    const res = data.map((item, index) => {
      return {
        ...item,
        moodScore: sentimentScores[index]?.sentiment_score || null, // Adding sentiment score, or null if not available
      };
    });

    // Set the updated state with the combined data
    setNewsData({ loading: false, data: res, error: null });
  } catch (err) {
    setNewsData({ loading: false, data: [], error: err.message });
  }
}


  // Fetch data on mount or when retry count changes
  useEffect(() => {
    fetchData(); // Trigger fetch when component mounts or retry count changes
  }, [retryCount]); // Only re-run when retryCount changes

  // Function to manually retry fetching data
  const retryFetch = () => {
    setRetryCount((prev) => prev + 1); // Increment retry count to trigger the useEffect
  };

  // Only fetch if raw data is empty (this ensures it doesn't re-fetch unnecessarily)
  if (!newsData || newsData.length === 0) {
    fetchData();
  }

  console.log("the sgtate ", newsData)

  // Return the actual data values from the Recoil state and retry function
  return {
    newsData: newsData, // Return the actual fetched data
    loading: loading,
    error: error,
    retryFetch,
  };
}

