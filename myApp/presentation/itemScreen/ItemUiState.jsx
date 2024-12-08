import { atom } from "recoil";
import NewsItem from '../../domain/modules/NewsItem'

export class ItemUiState{
  theItem;

  constructor() {
    this.theItem = new NewsItem(
      206030983,
      "Nearly 30 aftershocks recorded around NJ quake epicenter since Friday",
      "New Jersey continues to shake after Friday’s 4.8-magnitude earthquake and likely will continue to do so for some time...",
      "Twenty nine areas around Whitehouse Station, NJ, which was the epicenter of the quake, have since reported rumbles.",
      "https://nypost.com/wp-content/uploads/sites/2/2024/04/79582612.jpg?quality=75&strip=all&w=1200",
      "2024-04-06 22:44:18",
      ["Deirdre Bardolf"],
      "environment",
      "en",
      -0.545
    );
  }
}

// Define the counter state as an atom
export const itemUiState = atom({
  key: "itemUiState", // Unique ID (important)
  default: new ItemUiState(),
});
