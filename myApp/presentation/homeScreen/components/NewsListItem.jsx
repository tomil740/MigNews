import "../../style/NewsListItem.css";

function NewsListItem({item}) {
  return (
    <div className="news-list-item">
      <img src={item.image} alt={item.title} className="news-list-item-image" />
      <div className="news-list-item-content">
        <h3 className="news-list-item-header">{item.summary}</h3>
        <p className="news-list-item-author">By {item.authors}</p>
        <p className="news-list-item-timestamp">
          {new Date(item.publish_date).toLocaleString()}
        </p>
        <div className="news-list-item-mood">Mood Score: {item.moodScore}</div>
      </div>
    </div>
  );
}
export default NewsListItem;
