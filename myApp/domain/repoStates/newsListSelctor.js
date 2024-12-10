import { selector } from "recoil";
import { newsDataState } from "./newsDataState";
import ListNewsItem from "../models/ListNewsItem";

export const newsListSelector = selector({
  key: "newsListSelector", // Unique key for this selector
  get: ({ get }) => {
    const { data, loading, error } = get(newsDataState);

    // Always return a consistent structure
    const listItems = data
      ? data.map(
          (item) =>
            new ListNewsItem(
              item.id,
              item.title,
              item.author,
              item.moodScore,
              item.authors,
              item.publish_date,
              item.sentiment,
              item.image
            )
        )
      : [];

    return {
      items: listItems,
      loading,
      error,
    };
  },
});
