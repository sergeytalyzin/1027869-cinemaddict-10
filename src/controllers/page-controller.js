import FilmCard from "../components/film-card";
import FilmDetalis from "../components/film-detalis";
import {render, remove} from "../utils/render";
import ShowMoreButton from "../components/show-more-button";
import NoFilms from "../components/no-films";
import FilmContainer from "../components/film-container";
import FilmExtra from "../components/film-extra";
import {generateTable} from "../mock/card-details";
import Sorting, {SortType} from "../components/sorting";


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
      }
    };

    const popup = new FilmDetalis(card, cardEditionInfo).getElement();
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
  render(container, filmCard);
};

const renderCards = (container, cards, cardEditionInfo) => {
  cards.forEach((card) => renderCard(container, card, cardEditionInfo));
};


export default class PageController {
  constructor() {
    this._showMoreComponent = new ShowMoreButton();
    this._filmContainerComponent = new FilmContainer();
    this._noFilmsComponent = new NoFilms();
    this._sortComponent = new Sorting();
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
        renderCards(container, cards.slice(prevCardsShowing, showingCardsCount), cardDetails);
        if (showingCardsCount >= cards.length) {
          remove(this._showMoreComponent);
        }
      });
    };

    const cardDetails = generateTable();
    render(siteMain, this._sortComponent.getElement());
    if (cards.length < 1) {
      render(siteMain, this._noFilmsComponent.getElement());
      return;
    }

    render(siteMain, filmContainerElement);

    let showingCardsCount = CARDS_INDICATOR;
    renderCards(container, cards.slice(0, showingCardsCount), cardDetails);

    new Array(CATEGORIES_NUMBER).fill(``).forEach(() => render(filmContainerElement, new FilmExtra().getElement()));
    const extraTitles = filmContainerElement.querySelectorAll(`.films-list__title`);
    extraTitles[1].textContent = `Top rated`;
    extraTitles[2].textContent = `Most commented`;
    const extraFilms = filmContainerElement.querySelectorAll(`.films-list--extra`);
    const extraFilmsContainerRated = extraFilms[0].querySelector(`.films-list__container`);
    const extraFilmsContainerCommented = extraFilms[1].querySelector(`.films-list__container`);

    renderCards(extraFilmsContainerRated, cards.slice(0, CARDS_INDICATOR_EXTRA), cardDetails);
    renderCards(extraFilmsContainerCommented, cards.slice(0, CARDS_INDICATOR_EXTRA), cardDetails);
    renderShowMoreButton();
    this._sortComponent.setSortTypeHandler((sortType) => {
      let sortedCards = [];
      switch (sortType) {
        case SortType.DATE:
          sortedCards = cards.slice().sort((a, b) => b.year - a.year);
          break;
        case SortType.RATING :
          sortedCards = cards.slice().sort((a, b) => b.rating - a.rating);
          break;
        case SortType.DEFAULT:
          sortedCards = cards.slice(0, showingCardsCount);
      }
      container.innerHTML = ``;
      renderCards(container, sortedCards, cardDetails);
      if (sortType === SortType.DEFAULT) {
        renderShowMoreButton();
      } else {
        remove(this._showMoreComponent);
      }
    });
  }
}
