import React, { useEffect, useState, useCallback } from "react";
import { useRecoilValue } from "recoil";
import { newsListSelector } from "../../../domain/repoStates/newsListSelctor";
import NewsListItem from "../components/NewsListItem";
import { Link } from "react-router";
import { useSyncNewData } from "../../../data/repository/useSyncNewData"; // Import the custom hook

function HomeScreen() {
  const { items, loading, error } = useRecoilValue(newsListSelector); // Observe the news list
  const syncNewData = useSyncNewData(); // Use the custom hook
  const [errorMessage, setErrorMessage] = useState(null);

  // Memoize the sync function to avoid unnecessary re-renders
  const memoizedSyncNewData = useCallback(syncNewData, []);

  useEffect(() => {
    // Sync new data on component mount
    memoizedSyncNewData();
  }, [memoizedSyncNewData]);

  useEffect(() => {
    if (error) {
      setErrorMessage(error); // Display error message
      const timer = setTimeout(() => setErrorMessage(null), 2000); // Clear after 2 seconds
      return () => clearTimeout(timer); // Cleanup
    }
  }, [error]);

  return (
    <div>
      {/* Loading Overlay */}
      {loading && (
        <div className="loading-overlay">
          <p>Loading new data...</p>
        </div>
      )}

      {/* Error Handling Banner */}
      {errorMessage && (
        <div className="error-banner">
          <p>{`Error: ${errorMessage}`}</p>
        </div>
      )}

      {/* News List */}
      {items.length === 0 && !loading ? (
        <p>No news available.</p>
      ) : (
        <div className="news-list">
          {items.map((news) => (
            <div key={news.id} className="news-item">
              <Link to={`/newsItem/${(news.id)}`}>
                <NewsListItem item={news} />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HomeScreen;
