import FilmCard from "../components/film-card";
import FilmDetails from "../components/film-details";
import {render, replace} from "../utils/render";
const siteBody = document.querySelector(`body`);

// const ESCAPE_KEY = 27;

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};
export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onViewChange = onViewChange;
    this._onDataChange = onDataChange;
    this._filmCardComponent = null;
    this._popupComponent = null;
    this._mode = Mode.DEFAULT;
    this._replaceCardToPopup = this._replaceCardToPopup.bind(this);
  }

  render(card) {
    const oldCardComponent = this._filmCardComponent;
    this._filmCardComponent = new FilmCard(card);
    const filmCard = this._filmCardComponent.getElement();
    const oldPopupComponent = this._popupComponent;
    this._popupComponent = new FilmDetails(card);

    const getEmojiPopup = () => {
      this._popupComponent.getElement();
      this._popupComponent.getEmoji();
    };
    getEmojiPopup();

    const setListenersPopupOnCard = () => {
      // this._popupComponent.setAddToFavoritesListener(() => {
      //   this._onDataChange(this, card, Object.assign({}, card, {favorite: !card.favorite}));
      // });
      // this._popupComponent.setAddToWatchlistListener(() => {
      //   this._onDataChange(this, card, Object.assign({}, card, {watchlist: !card.watchlist}));
      // });
      // this._popupComponent.setWatchedListener(() => {
      //   this._onDataChange(this, card, Object.assign({}, card, {watched: !card.watched}));
      // });
      this._filmCardComponent.setAddToFavoritesListener(() => {
        this._onDataChange(this, card, Object.assign({}, card, {favorite: !card.favorite}));
      });
      this._filmCardComponent.setAddToWatchlistListener(() => {
        this._onDataChange(this, card, Object.assign({}, card, {watchlist: !card.watchlist}));
      });
      this._filmCardComponent.setWatchedListener(() => {
        this._onDataChange(this, card, Object.assign({}, card, {watched: !card.watched}));
      });
    };
  setListenersPopupOnCard();


    this._filmCardComponent.setShowPopupHandler(this._replaceCardToPopup);
    if (oldCardComponent && oldPopupComponent) {
      replace(this._filmCardComponent, oldCardComponent);
      replace(this._popupComponent, oldPopupComponent);
      // this.setListenersEscOnButton();
      this._popupComponent.setListenersEscOnButton();
    } else {
      render(this._container, filmCard);
    }
  }

  // setListenersEscOnButton() {
  //   const onEscKeyDown = (evt) => {
  //     if (evt.keyCode === ESCAPE_KEY) {
  //       closePopup();
  //     }
  //   };
  //   const closePopup = () => {
  //     this._popupComponent.getElement().remove();
  //     button.removeEventListener(`click`, closePopup);
  //     document.removeEventListener(`keydown`, onEscKeyDown);
  //   };
  //   const button = this._popupComponent.getElement().querySelector(`.film-details__close-btn`);
  //   button.addEventListener(`click`, closePopup);
  //   document.addEventListener(`keydown`, onEscKeyDown);
  // };


  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._popupComponent.getElement().remove();
    }
  }

  _replaceCardToPopup() {
    this._onViewChange();
    this._popupComponent.setListenersEscOnButton();
    // this.setListenersEscOnButton();
    render(siteBody, this._popupComponent.getElement());
    this._mode = Mode.EDIT;
  }
}
