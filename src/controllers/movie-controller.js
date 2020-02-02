import FilmCard from "../components/film-card";
import FilmDetails from "../components/film-details";
import {render, replace} from "../utils/render";
const siteBody = document.querySelector(`body`);


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
      this._filmCardComponent.setAddToFavoritesListener(() => {
        this._onDataChange(this, card, Object.assign({}, card, {favorite: !card.favorite}));
      });
      this._filmCardComponent.setAddToWatchlistListener(() => {
        this._onDataChange(this, card, Object.assign({}, card, {watchlist: !card.watchlist}));
      });
      this._filmCardComponent.setWatchedListener(() => {
        this._onDataChange(this, card, Object.assign({}, card, {watched: !card.watched}));
      });

      this._popupComponent.setAddToWatchlistListener(() => {
        this._onDataChange(this, card, Object.assign({}, card));
      });
      this._popupComponent.setWatchedListener(() => {
        this._onDataChange(this, card, Object.assign({}, card));
      });
      this._popupComponent.setDeleteCommentHandler(() => {
        this._onDataChange(this, card, Object.assign({}, card));
      });
      this._popupComponent.setAddToFavoritesListener(() => {
        this._onDataChange(this, card, Object.assign({}, card));
      });

      this._popupComponent.setFormSubmit(() => {
        this._onDataChange(this, card, Object.assign({}, card));
      });


    };
    setListenersPopupOnCard();


    this._filmCardComponent.setShowPopupHandler(this._replaceCardToPopup);
    if (oldCardComponent && oldPopupComponent) {
      replace(this._filmCardComponent, oldCardComponent);
      replace(this._popupComponent, oldPopupComponent);
      this._popupComponent.setListenersEscOnButton();
    } else {
      render(this._container, filmCard);
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._popupComponent.getElement().remove();
    }
  }

  _replaceCardToPopup() {
    this._onViewChange();
    this._popupComponent.setListenersEscOnButton();
    render(siteBody, this._popupComponent.getElement());
    this._mode = Mode.EDIT;
  }
}
