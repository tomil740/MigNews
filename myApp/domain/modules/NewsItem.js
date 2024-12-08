export default class NewsItem {
  id;
  title;
  text;
  summary;
  image;
  publish_date;
  authors;
  category;
  language;
  sentiment;

  constructor(
    id,
    title,
    text,
    summary,
    image,
    publish_date,
    authors,
    category,
    language,
    sentiment
  ) {
    this.id = id; // Unique identifier for the news item
    this.title = title; // Title of the news item
    this.text = text; // Full text/content of the article
    this.summary = summary; // Summary of the article
    this.image = image; // URL of the main image
    this.publish_date = publish_date; // Date the article was published
    this.authors = authors; // List of authors
    this.category = category; // Article category (e.g., "environment")
    this.language = language; // Language of the article
    this.sentiment = sentiment; // Sentiment score for the article
  }
}
