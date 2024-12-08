import { useEffect } from "react";
import { useHomeViewModel } from "../useHomeViewModel";
import NewsListItem from "./NewsListItem";
import { Link } from "react-router";


function HomeScreen() {
  // Destructure the values returned from the useHomeViewModel hook
  const uiState = useHomeViewModel();

  // Handle the loading state
  if (uiState.loading) {
    return <div>Loading...</div>; // You can replace this with a spinner or other loading indicator
  }

  // Handle the error state
  if (uiState.error) {
    return <div>Error: {uiState.error}</div>;
  }

  // Handle when no data is available
  if (!uiState.data || uiState.data.length === 0) {
    return <div>No news available</div>;
  }

  // Render the list of news items
  return (
    <div className="matched-list-container">
      {uiState.data.map((item) => (
        <Link to={`/newsItem/${item.id}`}>
          <NewsListItem key={item.id} item={item} />
        </Link>
      ))}
    </div>
  );
}

export default HomeScreen;
