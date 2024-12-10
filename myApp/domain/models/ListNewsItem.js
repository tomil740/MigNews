export default class ListNewsItem {
  id;
  title;
  author;
  moodScore;
  publish_date;
  sentiment;
  image;

  constructor(id, title,author, moodScore, publish_date, sentiment, image) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.moodScore = moodScore;
    this.publish_date = publish_date;
    this.sentiment = sentiment;
    this.image = image;
  }
}
