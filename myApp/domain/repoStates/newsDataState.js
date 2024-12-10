import { atom } from "recoil";

export const newsDataState = atom({
  key: "newsDataState", // unique key
  default: {
    data: [], // Holds the fetched news articles
    loading: false, // Indicates if data is being loaded
    error: null, // Holds error message if any
  },
});
