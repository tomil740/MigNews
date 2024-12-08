import { useParams } from "react-router-dom";
import { useItemVm } from "../useItemVm";
import "../../style/ItemPage.css"; // Import styles

function ItemPage() {
  const { itemId } = useParams(); // Get the item ID from the URL
  const { uiState, article, updateMood, loadingMood } = useItemVm(itemId);

  // Handle loading state for article
  if (uiState.loading) {
    return <div className="loading">Loading article...</div>;
  }

  // Handle error state
  if (uiState.error) {
    return <div className="error">Error: {uiState.error}</div>;
  }

  // Handle missing data
  if (!uiState.theItem) {
    return <div className="no-data">No news item found.</div>;
  }

  // Destructure properties from article and uiState.theItem
  const { title, text, moodScore } = article;
  const {
    summary,
    image,
    publish_date,
    authors,
    category,
    language,
    sentiment,
  } = uiState.theItem;

  return (
    <div className="item-page-container">
      <h1>My Mood: {moodScore !== null ? moodScore : "N/A"}</h1>

      {/* Show loading spinner when mood is being updated */}
      {loadingMood ? (
        <div className="loading">Updating mood...</div>
      ) : (
        <button onClick={updateMood}>Reduce Mood Score</button>
      )}

      <img className="news-image" src={image} alt={title} />
      <div className="news-content">
        <h1 className="news-title">{title}</h1>
        <p className="news-authors">
          <strong>Author(s):</strong> {authors?.join(", ") || "Unknown"}
        </p>
        <p className="news-publish-date">
          <strong>Published On:</strong>{" "}
          {new Date(publish_date).toLocaleString()}
        </p>
        <p className="news-summary">
          <strong>Summary:</strong> {summary}
        </p>
        <p className="news-text">
          <strong>Full Text:</strong> {text}
        </p>
        <div className="news-details">
          <p>
            <strong>Category:</strong> {category}
          </p>
          <p>
            <strong>Language:</strong> {language.toUpperCase()}
          </p>
          <p>
            <strong>Sentiment Score:</strong> {sentiment}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ItemPage;
