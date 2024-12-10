export default class NewsItem {
  id;
  title;
  author;
  moodScore;
  text;
  summary;
  image;
  publish_date;
  category;
  language;
  sentiment;

  constructor(
    id,
    title,
    author,
    moodScore,
    text,
    summary,
    image,
    publish_date,
    category,
    language,
    sentiment
  ) {
    this.id = id; // Unique identifier for the news item
    this.title = title; // Title of the news item
    this.author = author;
    this.moodScore = moodScore;
    this.text = text; // Full text/content of the article
    this.summary = summary; // Summary of the article
    this.image = image; // URL of the main image
    this.publish_date = publish_date; // Date the article was published
    this.category = category; // Article category (e.g., "environment")
    this.language = language; // Language of the article
    this.sentiment = sentiment; // Sentiment score for the article
  }
}
