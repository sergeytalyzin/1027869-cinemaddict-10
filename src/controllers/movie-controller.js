import FilmCard from "../components/film-card";
import FilmDetails, {Emoji} from "../components/film-details";
import {render, replace} from "../utils/render";
const siteBody = document.querySelector(`body`);

const ESCAPE_KEY = 27;

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
    this._onChooseEmoji = this._onChooseEmoji.bind(this);

  }

  render(card) {
    const oldCardComponent = this._filmCardComponent;
    this._filmCardComponent = new FilmCard(card);
    const filmCard = this._filmCardComponent.getElement();

    const oldPopupComponent = this._popupComponent;
    this._popupComponent = new FilmDetails(card);
    const popup = this._popupComponent.getElement();
    this._popupComponent.setEmoji(this._onChooseEmoji);

    const showPopup = () => {
      const onEscKeyDown = (evt) => {
        if (evt.keyCode === ESCAPE_KEY) {
          closePopup();
        }
      };
      if (popup) {
        render(siteBody, popup);
      }

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
      showPopup();
    } else {
      render(this._container, filmCard);
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceCardToPopup();

    }
  }

  _replaceCardToPopup() {
    this._onViewChange();

    render(siteBody, this._popupComponent);
    this._mode = Mode.EDIT;
  }

  _onChooseEmoji(emoji) {
    const addEmoji = this._popupComponent.getElement().querySelector(`.film-details__add-emoji-label`);
    switch (emoji) {
      case Emoji.SMILE:
        addEmoji.innerHTML = ``;
        addEmoji.insertAdjacentHTML(`beforeend`, `<img src="./images/emoji/smile.png" width="55" height="55" alt="emoji">`);
      break;
      case Emoji.SLEEPING:
        addEmoji.innerHTML = ``;
        addEmoji.insertAdjacentHTML(`beforeend`, `<img src="./images/emoji/sleeping.png" width="55" height="55" alt="emoji">`);
        break;
      case Emoji.PUKE:
        addEmoji.innerHTML = ``;
        addEmoji.insertAdjacentHTML(`beforeend`, `<img src="./images/emoji/puke.png" width="55" height="55" alt="emoji">`);
        break;
      case Emoji.ANGRY:
        addEmoji.innerHTML = ``;
        addEmoji.insertAdjacentHTML(`beforeend`, `<img src="./images/emoji/angry.png" width="55" height="55" alt="emoji">`);
        break;
    }
  }
}
