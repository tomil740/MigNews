import { useParams } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { useInitNewsItem } from "../../../domain/useCaseHooks/useInitNewsItem"; // Import your custom hooks
import { useReduceMood } from "../../../domain/useCaseHooks/useReduceNewsMood"; // Import your custom hooks
import "../../style/ItemPage.css"; // Import styles

function ItemPage() {
  const { itemId } = useParams(); // Get item ID from URL
  const [localItem, setLocalItem] = useState(null); // Local state for item
  const [loading, setLoading] = useState(true); // Local loading state
  const [error, setError] = useState(null); // Local error state

  const {
    reduceMood,
    loading: moodLoading,
    error: moodError,
    updatedItem,
  } = useReduceMood(); // Custom hook for mood management

  // Memoize the initialization function to prevent re-triggering of useEffect
  const { initNewsItem } = useInitNewsItem(itemId);
  const memoizedInitNewsItem = useMemo(() => initNewsItem, [itemId]);

  // Effect to initialize news item on mount or when itemId changes
  useEffect(() => {
    setError(null); // Reset error state
    setLoading(true); // Set loading state

    const fetchData = async () => {
      try {
        if (itemId) {
          const fetchedItem = await memoizedInitNewsItem(); // Use memoized function
          setLocalItem(fetchedItem); // Save fetched item to local state
        }
      } catch (err) {
        setError(err.message || "Failed to load item."); // Handle fetch error
      } finally {
        setLoading(false); // Stop loading
      }
    };

    if (itemId) {
      fetchData();
    }
  }, [itemId, memoizedInitNewsItem]); // Only re-run if itemId changes

  // Update the local item when mood changes
  useEffect(() => {
    if (updatedItem) {
      console.log("validupdate",updatedItem)
      setLocalItem({
        ...localItem,
        title: updatedItem.title,
        text: updatedItem.description,
        moodScore: updatedItem.moodScore,
      });
    }
  }, [updatedItem]);

  // Loading UI
  if (loading) {
    return <div className="loading">Loading article...</div>;
  }

  // Error UI
  if (error) {
    return <div className="error">{`Error: ${error}`}</div>;
  }

  // No item found UI
  if (!localItem) {
    return <div className="no-data">No news item found.</div>;
  }

  // Destructure properties from the local item
  const {
    title,
    text,
    moodScore,
    summary,
    image,
    publish_date,
    author,
    category,
    language,
    sentiment,
  } = localItem;

  return (
    <div className="item-page-container">
      <h1>My Mood: {moodScore !== null ? moodScore : "N/A"}</h1>

      {/* Mood Update Button */}
      {moodLoading ? (
        <div className="loading">Updating mood...</div>
      ) : (
        <button
          onClick={() => reduceMood(localItem)} // Trigger mood reduction
          disabled={moodLoading}
        >
          Reduce Mood Score
        </button>
      )}

      {/* Display Error from Mood Update */}
      {moodError && <div className="error">{moodError}</div>}

      {/* News Details */}
      <img className="news-image" src={image} alt={title} />
      <div className="news-content">
        <h1 className="news-title">{title}</h1>
        <p className="news-author">
          <strong>Author:</strong> {author || "Unknown"}
        </p>
        <p className="news-publish-date">
          <strong>Published On:</strong>{" "}
          {publish_date ? new Date(publish_date).toLocaleString() : "Unknown"}
        </p>
        <p className="news-summary">
          <strong>Summary:</strong> {summary}
        </p>
        <p className="news-text">
          <strong>Full Text:</strong> {text || "No content available."}
        </p>
        <div className="news-details">
          <p>
            <strong>Category:</strong> {category || "Unknown"}
          </p>
          <p>
            <strong>Language:</strong> {language?.toUpperCase() || "N/A"}
          </p>
          <p>
            <strong>Sentiment Score:</strong> {sentiment ?? "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ItemPage;
