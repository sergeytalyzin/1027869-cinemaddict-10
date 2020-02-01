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
  constructor(moviesModel) {
    this._moviesModel = moviesModel;
    this._showedCardControllers = [];
    this._showMoreComponent = new ShowMoreButton();
    this._filmContainerComponent = new FilmContainer();
    this._noFilmsComponent = new NoFilms();
    this._sortComponent = new Sorting();
    this._showingCardsCount = CARDS_INDICATOR;
    this._prevCardsShowing = null;
    this._container = null;
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._moviesModel.setFilterChangeHandler(this._onFilterChange);
  }

  render() {

    const filmContainerElement = this._filmContainerComponent.getElement();
    this._container = filmContainerElement.querySelector(`.films-list__container`);

    render(siteMain, this._sortComponent.getElement());
    if (this._moviesModel.getCards().length < 1) {
      render(siteMain, this._noFilmsComponent.getElement());
      return;
    }

    render(siteMain, filmContainerElement);
    this._renderMovies(this._moviesModel.getCards(0, this._showingCardsCount));

    new Array(CATEGORIES_NUMBER).fill(``).forEach(() => render(filmContainerElement, new FilmExtra().getElement()));
    const extraTitles = filmContainerElement.querySelectorAll(`.films-list__title`);
    extraTitles[1].textContent = `Top rated`;
    extraTitles[2].textContent = `Most commented`;
    const extraFilms = filmContainerElement.querySelectorAll(`.films-list--extra`);
    const extraFilmsContainerRated = extraFilms[0].querySelector(`.films-list__container`);
    const extraFilmsContainerCommented = extraFilms[1].querySelector(`.films-list__container`);

    const newCardsRated = renderCards(extraFilmsContainerRated, this._moviesModel.getCards().slice(0, CARDS_INDICATOR_EXTRA), this._onDataChange, this._onViewChange);
    this._showedCardControllers = this._showedCardControllers.concat(newCardsRated);
    const newCardsCommented = renderCards(extraFilmsContainerCommented, this._moviesModel.getCards().slice(0, CARDS_INDICATOR_EXTRA), this._onDataChange, this._onViewChange);
    this._showedCardControllers = this._showedCardControllers.concat(newCardsCommented);
    this.renderShowMoreButton();
    this._sortComponent.setSortTypeHandler(this._onSortTypeChange);
  }

  _renderMovies(cards) {
    const newCards = renderCards(this._container, cards, this._onDataChange, this._onViewChange);
    this._showedCardControllers = this._showedCardControllers.concat(newCards);
    this._showingCardsCount = this._showedCardControllers.length;
  }

  _removeMovies() {
    this._container.innerHTML = ``;
      // this._showedCardControllers.forEach((taskController) => taskController.destroy());
      this._showedCardControllers = [];

    // this._prevCardsShowing = this._showingCardsCount;
    // this._showingCardsCount = CARDS_INDICATOR;
    // this.renderShowMoreButton();
  }

  _updateTasks(count) {
    this._removeMovies();
    this._renderMovies(this._moviesModel.getCards().slice(0, count));
    this.renderShowMoreButton();
  }
  _onFilterChange() {
    this._updateTasks(CARDS_INDICATOR);
  }

  _onSortTypeChange(sortType) {
    let sortedCards = [];
    switch (sortType) {
      case SortType.DATE:
        sortedCards = this._moviesModel.getCards().slice(0, this._showingCardsCount).sort((a, b) => b.year - a.year);
        break;
      case SortType.RATING :
        sortedCards = this._moviesModel.getCards().slice(0, this._showingCardsCount).sort((a, b) => b.rating - a.rating);
        break;
      case SortType.DEFAULT:
        sortedCards = this._moviesModel.getCards().slice(0, this._showingCardsCount);
        break;
    }
    this._removeMovies();
    this._renderMovies(sortedCards);
  }


  renderShowMoreButton() {
    remove(this._showMoreComponent);
    if (this._showingCardsCount >= this._moviesModel.getCards().length) {
      return;
    }
    const filmList = siteBody.querySelector(`.films-list`);
    render(filmList, this._showMoreComponent.getElement());

    this._showMoreComponent.setShowMoreButtonClickHandler(() => {
      this._prevCardsShowing = this._showingCardsCount;
      this._showingCardsCount = this._showingCardsCount + CARD_BUTTON;

      this._renderMovies(this._moviesModel.getCards().slice(this._prevCardsShowing, this._showingCardsCount));
      if (this._showingCardsCount >= this._moviesModel.getCards().length) {
        remove(this._showMoreComponent);
      }
    });

  }

  _onDataChange(movieController, oldData, newData) {
    const isSuccess = this._moviesModel.updateMovies(oldData.id, newData);
    if (isSuccess) {
      movieController.render(newData);
    }
  }

  _onViewChange() {
    this._showedCardControllers.forEach((it) => it.setDefaultView());
  }
}
