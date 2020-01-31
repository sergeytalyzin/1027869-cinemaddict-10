import {FilterType} from "../const";

const getFavorites = (cards) => {
  return cards.filter((card) => card.favorite);
};

const getHistory = (cards) => {
  return cards.filter((card) => card.watched);
};

const getWatchList = (cards) => {
  return cards.filter((card) => card.watchlist);
};


export const getMoviesByFilter = (cards, filterType) => {
  switch (filterType) {
    case FilterType.ALLMOVIES:
      return cards;
    case FilterType.FAVORITES:
      return getFavorites(cards);
    case FilterType.WATCHLIST:
      return getWatchList(cards);
    case FilterType.HISTORY:
      return getHistory(cards);
    case FilterType.STATS:
      return cards;
  }
  return cards;
};
