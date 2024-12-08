export default class ListNewsItem {
  id;
  title;
  authors;
  publish_date;
  sentiment;
  image;

  constructor(id, title, authors, publish_date, sentiment, image) {
    this.id = id;
    this.title = title;
    this.authors = authors;
    this.publish_date = publish_date;
    this.sentiment = sentiment;
    this.image = image;
  }
}
