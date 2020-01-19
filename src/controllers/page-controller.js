import {render, remove} from "../utils/render";
import ShowMoreButton from "../components/show-more-button";
import NoFilms from "../components/no-films";
import FilmContainer from "../components/film-container";
import FilmExtra from "../components/film-extra";
import Sorting, {SortType} from "../components/sorting";
import MovieController from "./movie-controller";


const CARDS_INDICATOR = 5;
const CARDS_INDICATOR_EXTRA = 2;
const CATEGORIES_NUMBER = 2;
const CARD_BUTTON = 5;


const siteBody = document.querySelector(`body`);
const siteMain = document.querySelector(`.main`);

const renderCards = (container, cards, onDataChange, onViewChange) => {
  return cards.map((card) =>{
    const movieController = new MovieController(container, onDataChange, onViewChange);
    movieController.render(card);
    return movieController;
  });
};


export default class PageController {
  constructor() {
    this._showedCardControllers = [];
    this._showMoreComponent = new ShowMoreButton();
    this._filmContainerComponent = new FilmContainer();
    this._noFilmsComponent = new NoFilms();
    this._sortComponent = new Sorting();
    this._showingCardsCount = CARDS_INDICATOR;
    this._cards = [];
    this._container = null;
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
  }

  render(cards) {
    this._cards = cards;
    const filmContainerElement = this._filmContainerComponent.getElement();
    this._container = filmContainerElement.querySelector(`.films-list__container`);

    render(siteMain, this._sortComponent.getElement());
    if (this._cards.length < 1) {
      render(siteMain, this._noFilmsComponent.getElement());
      return;
    }

    render(siteMain, filmContainerElement);


    const newCards = renderCards(this._container, this._cards.slice(0, this._showingCardsCount), this._onDataChange, this._onViewChange);
    this._showedCardControllers = this._showedCardControllers.concat(newCards);
    new Array(CATEGORIES_NUMBER).fill(``).forEach(() => render(filmContainerElement, new FilmExtra().getElement()));
    const extraTitles = filmContainerElement.querySelectorAll(`.films-list__title`);
    extraTitles[1].textContent = `Top rated`;
    extraTitles[2].textContent = `Most commented`;
    const extraFilms = filmContainerElement.querySelectorAll(`.films-list--extra`);
    const extraFilmsContainerRated = extraFilms[0].querySelector(`.films-list__container`);
    const extraFilmsContainerCommented = extraFilms[1].querySelector(`.films-list__container`);

    const newCardsRated = renderCards(extraFilmsContainerRated, this._cards.slice(0, CARDS_INDICATOR_EXTRA), this._onDataChange, this._onViewChange);
    this._showedCardControllers = this._showedCardControllers.concat(newCardsRated);
    const newCardsCommented = renderCards(extraFilmsContainerCommented, this._cards.slice(0, CARDS_INDICATOR_EXTRA), this._onDataChange, this._onViewChange);
    this._showedCardControllers = this._showedCardControllers.concat(newCardsCommented);
    this.renderShowMoreButton();
    this._sortComponent.setSortTypeHandler(this._onSortTypeChange);
  }

  _onSortTypeChange(sortType) {
    let sortedCards = [];
    switch (sortType) {
      case SortType.DATE:
        sortedCards = this._cards.slice().sort((a, b) => b.year - a.year);
        break;
      case SortType.RATING :
        sortedCards = this._cards.slice().sort((a, b) => b.rating - a.rating);
        break;
      case SortType.DEFAULT:
        sortedCards = this._cards.slice(0, this._showingCardsCount);
        break;
    }
    this._container.innerHTML = ``;
    const newCards = renderCards(this._container, sortedCards, this._onDataChange, this._onViewChange);
    this._showedCardControllers = this._showedCardControllers.concat(newCards);
    if (sortType === SortType.DEFAULT) {
      this.renderShowMoreButton();
    } else {
      remove(this._showMoreComponent);
    }
  }


  renderShowMoreButton() {
    if (this._showingCardsCount >= this._cards.length) {
      return;
    }
    const filmList = siteBody.querySelector(`.films-list`);
    render(filmList, this._showMoreComponent.getElement());
    this._showMoreComponent.setShowMoreButtonClickHandler(() => {
      const prevCardsShowing = this._showingCardsCount;
      this._showingCardsCount = this._showingCardsCount + CARD_BUTTON;
      renderCards(this._container, this._cards.slice(prevCardsShowing, this._showingCardsCount), this._onDataChange);
      if (this._showingCardsCount >= this._cards.length) {
        remove(this._showMoreComponent);
      }
    });
  }

  _onDataChange(movieController, oldData, newData) {
    const index = this._cards.findIndex((it) => it === oldData);
    if (index === -1) {
      return;
    }
    this._cards = [].concat(this._cards.slice(0, index), newData, this._cards.slice(index + 1));
    movieController.render(this._cards[index]);
  }
  _onViewChange() {
    this._showedCardControllers.forEach((it) => it.setDefaultView());
  }
}
