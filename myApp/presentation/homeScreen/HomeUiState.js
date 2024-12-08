import { atom } from "recoil";

// Modify the HomeUiState class to include loading and error
export class HomeUiState {
  constructor() {
    this.newsData = []; // Will hold the list of news
    this.loading = false; // Indicates if data is being fetched
    this.error = null; // Will hold any error message
  }
}

// Define the state atom using Recoil
export const homeUiState = atom({
  key: "HomeUiState", // Unique ID
  default: new HomeUiState(),
});
