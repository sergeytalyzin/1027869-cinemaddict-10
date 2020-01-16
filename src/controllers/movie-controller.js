import FilmCard from "../components/film-card";
import FilmDetails from "../components/film-details";
import {render, replace} from "../utils/render";
const siteBody = document.querySelector(`body`);

const ESCAPE_KEY = 27;
export default class MovieController {
  constructor(container, cardEditionInfo, onDataChange) {
    this._container = container;
    this._cardEditionInfo = cardEditionInfo;
    this._onDataChange = onDataChange;
    this._filmCardComponent = null;
    this._popupComponent = null;

  }
  render(card) {
    const oldCardComponent = this._filmCardComponent;
    this._filmCardComponent = new FilmCard(card);
    const filmCard = this._filmCardComponent.getElement();

    const oldPopupComponent = this._popupComponent;
    this._popupComponent = new FilmDetails(card, this._cardEditionInfo);
    const popup = this._popupComponent.getElement();


    const showPopup = () => {
      const onEscKeyDown = (evt) => {
        if (evt.keyCode === ESCAPE_KEY) {
          closePopup();
        }
      };
      render(siteBody, popup);
      const closePopup = () => {
        popup.remove();
        button.removeEventListener(`click`, closePopup);
        document.removeEventListener(`keydown`, onEscKeyDown);
      };
      const button = popup.querySelector(`.film-details__close-btn`);
      button.addEventListener(`click`, closePopup);
      document.addEventListener(`keydown`, onEscKeyDown);
    };


    this._popupComponent.setAddToFavoritesListener(() => {
      this._onDataChange(this, card, Object.assign({}, card, {favorite: !card.favorite}));
    });
    this._popupComponent.setAddToWatchlistListener(() => {
      this._onDataChange(this, card, Object.assign({}, card, {watchlist: !card.watchlist}));
    });
    this._popupComponent.setWatchedListener(() => {
      this._onDataChange(this, card, Object.assign({}, card, {watched: !card.watched}));
    });
    this._filmCardComponent.setAddToFavoritesListener(() => {
      this._onDataChange(this, card, Object.assign({}, card, {favorite: !card.favorite}));
    });
    this._filmCardComponent.setAddToWatchlistListener(() => {
      this._onDataChange(this, card, Object.assign({}, card, {watchlist: !card.watchlist}));
    });
    this._filmCardComponent.setWatchedListener(() => {
      this._onDataChange(this, card, Object.assign({}, card, {watched: !card.watched}));
    });


    this._filmCardComponent.setShowPopupHandler(showPopup);
    if (oldCardComponent && oldPopupComponent) {
      replace(this._filmCardComponent, oldCardComponent);
      replace(this._popupComponent, oldPopupComponent);
    } else {
      render(this._container, filmCard);
    }
  }
}
