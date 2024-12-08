import { selectorFamily } from "recoil";
import { localDataFetch } from "./localDataState";

export const newsItemByIdSelector = selectorFamily({
  key: "newsItemByIdSelector",
  get:
    (id) =>
    ({ get }) => {
      const allNews1 = get(localDataFetch); // Access the list of all news items
      const allNews = allNews1.data; // Access the list of all news items
      return allNews.find((newsItem) => newsItem.id === id) || null; // Return the matching item or null
    },
});
