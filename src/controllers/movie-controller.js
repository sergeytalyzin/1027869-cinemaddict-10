import FilmCard from "../components/film-card";
import FilmDetalis from "../components/film-detalis";
import {render} from "../utils/render";
const siteBody = document.querySelector(`body`);

const ESCAPE_KEY = 27;
export default class MovieController {
  constructor(container, cardEditionInfo) {
    this._container = container;
    this._cardEditionInfo = cardEditionInfo;
  }
  render(card) {
    const filmCardComponent = new FilmCard(card);
    const filmCard = filmCardComponent.getElement();
    const showPopup = () => {
      const onEscKeyDown = (evt) => {
        if (evt.keyCode === ESCAPE_KEY) {
          closePopup();
        }
      };

      const popup = new FilmDetalis(card, this._cardEditionInfo).getElement();
      render(siteBody, popup);

      const closePopup = () => {
        siteBody.removeChild(popup);
        button.removeEventListener(`click`, closePopup);
        document.removeEventListener(`keydown`, onEscKeyDown);
      };

      const button = popup.querySelector(`.film-details__close-btn`);
      button.addEventListener(`click`, closePopup);
      document.addEventListener(`keydown`, onEscKeyDown);
    };

    filmCardComponent.setShowPopupHandler(showPopup);
    render(this._container, filmCard);
  }
}
