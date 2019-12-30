import FilmCard from "../components/film-card";
import FilmDetalis from "../components/film-detalis";
import {render, remove} from "../utils/render";
import ShowMoreButton from "../components/show-more-button";
import NoFilms from "../components/no-films";
import FilmContainer from "../components/film-container";
import FilmExtra from "../components/film-extra";
import {generateTable} from "../mock/card-details";


const CARDS_INDICATOR = 5;
const CARDS_INDICATOR_EXTRA = 2;
const CATEGORIES_NUMBER = 2;
const CARD_BUTTON = 5;

const ESCAPE_KEY = 27;

const siteBody = document.querySelector(`body`);
const siteMain = document.querySelector(`.main`);


const renderCard = (container, card, cardEditionInfo) => {
  const filmCardComponent = new FilmCard(card);
  const filmCard = filmCardComponent.getElement();
  const showPopup = () => {
    const onEscKeyDown = (evt) => {
      if (evt.keyCode === ESCAPE_KEY) {
        closePopup();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    const popup = new FilmDetalis(card, cardEditionInfo).getElement();
    render(siteBody, popup);

    const closePopup = () => {
      siteBody.removeChild(popup);
      button.removeEventListener(`click`, closePopup);
    };

    const button = popup.querySelector(`.film-details__close-btn`);
    button.addEventListener(`click`, closePopup);
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  filmCardComponent.setShowPopupHandler(showPopup);
  render(container, filmCard);
};

export default class PageController {
  constructor() {
    this._showMoreComponent = new ShowMoreButton();
    this._filmContainerComponent = new FilmContainer();
    this._noFilmsComponent = new NoFilms();
  }

  render(cards) {
    const filmContainerElement = this._filmContainerComponent.getElement();
    const container = filmContainerElement.querySelector(`.films-list__container`);
    const renderShowMoreButton = () => {
      if (showingCardsCount >= cards.length) {
        return;
      }
      const filmList = siteBody.querySelector(`.films-list`);
      render(filmList, this._showMoreComponent.getElement());
      this._showMoreComponent.setShowMoreButtonClickHandler(() => {
        const prevCardsShowing = showingCardsCount;
        showingCardsCount = showingCardsCount + CARD_BUTTON;
        cards.slice(prevCardsShowing, showingCardsCount).forEach((card) => renderCard(container, card));
        if (showingCardsCount >= cards.length) {
          remove(this._showMoreComponent);
        }
      });
    };

    const cardDetails = generateTable();

    if (cards.length < 1) {
      render(siteMain, this._noFilmsComponent.getElement());
      return;
    }
    render(siteMain, filmContainerElement);

    let showingCardsCount = CARDS_INDICATOR;
    cards.slice(0, showingCardsCount).forEach((card) => renderCard(container, card, cardDetails));

    new Array(CATEGORIES_NUMBER).fill(``).forEach(() => render(filmContainerElement, new FilmExtra().getElement()));
    const extraTitles = filmContainerElement.querySelectorAll(`.films-list__title`);
    extraTitles[1].textContent = `Top rated`;
    extraTitles[2].textContent = `Most commented`;

    const extraFilms = filmContainerElement.querySelectorAll(`.films-list--extra`);
    const extraFilmsContainerRated = extraFilms[0].querySelector(`.films-list__container`);
    const extraFilmsContainerCommented = extraFilms[1].querySelector(`.films-list__container`);

    cards.slice(0, CARDS_INDICATOR_EXTRA).forEach((card) => renderCard(extraFilmsContainerRated, card));
    cards.slice(0, CARDS_INDICATOR_EXTRA).forEach((card) => renderCard(extraFilmsContainerCommented, card));
    renderShowMoreButton();
  }
}
