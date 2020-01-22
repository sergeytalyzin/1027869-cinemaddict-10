import AbstractComponent from "./abstract-component";
import FilmDetailsWithRating from "./film-details-with-rating";


export const getFilmCardsTemplate = (card) => {

  const {description, title, rating, year, genre, duration, poster, comment, favorite} = card;

  return (`<article class="film-card">
          <h3 class="film-card__title">${title}</h3>
          <p class="film-card__rating">${rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${year}</span>
            <span class="film-card__duration">${duration}</span>
            <span class="film-card__genre">${genre}</span>
          </p>
          <img src="./images/posters/${poster}" alt="" class="film-card__poster">
          <p class="film-card__description">${description}</p>
          <a class="film-card__comments">${comment} comments</a>
          <form class="film-card__controls">
          ${favorite ? `EEEEEEE` : ``}
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
          </form>
        </article>`);
};

export default class Card extends AbstractComponent {
  constructor(card) {
    super();
    this._card = card;
    this.checkedRatingWatchlistWatched();
  }
  getTemplate() {
    return getFilmCardsTemplate(this._card);
  }
  setShowPopupHandler(handler) {
    this._element.querySelector(`.film-card__title`).addEventListener(`click`, handler);
    this._element.querySelector(`.film-card__comments`).addEventListener(`click`, handler);
    this._element.querySelector(`.film-card__poster`).addEventListener(`click`, handler);
  }
  checkedRatingWatchlistWatched() {
    if (this._card.watched === true) {
      const inputWatched = this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`);
      inputWatched.classList.add(`film-card__controls-item--active`);
    }
    if (this._card.watchlist === true) {
      const inputWatchlist = this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`);
      inputWatchlist.classList.add(`film-card__controls-item--active`);
    }
    if (this._card.favorite === true) {
      const inputFavorite  = this.getElement().querySelector(`.film-card__controls-item--favorite`);
      inputFavorite.classList.add(`film-card__controls-item--active`);
    }
  }

  setAddToWatchlistListener(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, handler);
  }
  setWatchedListener(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, handler);
  }
  setAddToFavoritesListener(handler) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, handler);
  }
}
