import {FilterType} from "../const";
import {getMoviesByFilter} from "../utils/navigationFilter";

export default class Movies {
  constructor() {
    this._cards = [];
    this._activeFilterType = FilterType.ALLMOVIES;
  }
  getCards() {
    return getMoviesByFilter(this._cards, this._activeFilterType);
  }

  getAllCards() {
    return this._cards;
  }

  setCards(cards) {
    this._cards = Array.from(cards);
  }

  updateMovies(id, card) {
    const index = this._cards.findIndex((it) => it.id === id);
    if (index === -1) {
      return false;
    }
    const firstToNewCards = this._cards.slice(0, index);

    const newToLastCards = this._cards.slice(index + 1);

    this._cards = [].concat(firstToNewCards, card, newToLastCards);

    return true;
  }
}
