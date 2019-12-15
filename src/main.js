import {getExtraFilmList} from "./components/film-extra";
import {getButtonShowMoreTemplate} from "./components/show-more-button";
import {getFilmCardsTemplate} from "./components/film-card";
import {getFilms} from "./components/film-container";
import {getFilmDetailsTemplate} from "./components/film-detalis";
import {getMainNavTemplate} from "./components/navigation";
import {getProfileHeaderTemplate} from "./components/profile";
import {getSortTemplate} from "./components/sorting";
import {getStatisticTemplate} from "./components/statistic";
import {generateCardsFilms} from "./mock/card";
import {generateFilterStatistic} from "./mock/statistic-filters";
import {generateTable} from "./mock/card-details";

const FILMS_TIMES = 22;
const CARDS_INDICATOR = 5;
const CARDS_INDICATOR_EXTRA = 2;
const CATEGORIES_NUMBER = 2;
const CARD_BUTTON = 5;
const render = (container, template, position = `beforeend`) => {
  container.insertAdjacentHTML(position, template);
};

const siteBody = document.querySelector(`body`);
const header = document.querySelector(`.header`);
const siteMain = document.querySelector(`.main`);


render(header, getProfileHeaderTemplate());

render(siteMain, getMainNavTemplate());
const filter = generateFilterStatistic();
render(siteMain, getStatisticTemplate(filter));
render(siteMain, getSortTemplate());
render(siteMain, getFilms());

const filmListContainer = siteMain.querySelector(`.films-list__container`);
const cards = generateCardsFilms(FILMS_TIMES);

let showingCardsCount = CARDS_INDICATOR;
cards.slice(0, showingCardsCount).forEach((card) => render(filmListContainer, getFilmCardsTemplate(card)));

const cardDetails = generateTable();
render(siteBody, getFilmDetailsTemplate(cards[1], cardDetails));

const filmDetalis = siteBody.querySelector(`.film-details`);
filmDetalis.setAttribute(`style`, `display:none;`);

const filmList = siteBody.querySelector(`.films-list`);
render(filmList, getButtonShowMoreTemplate());
const films = siteBody.querySelector(`.films`);

new Array(CATEGORIES_NUMBER).fill(``).forEach(() => render(films, getExtraFilmList()));
const extraTitles = siteBody.querySelectorAll(`.films-list__title`);
extraTitles[1].textContent = `Top rated`;
extraTitles[2].textContent = `Most commented`;

const extraFilms = siteBody.querySelectorAll(`.films-list--extra`);
const extraFilmsContainerRated = extraFilms[0].querySelector(`.films-list__container`);
const extraFilmsContainerCommented = extraFilms[1].querySelector(`.films-list__container`);

cards.slice(0, CARDS_INDICATOR_EXTRA).forEach((card) => render(extraFilmsContainerRated, getFilmCardsTemplate(card)));
cards.slice(0, CARDS_INDICATOR_EXTRA).forEach((card) => render(extraFilmsContainerCommented, getFilmCardsTemplate(card)));

const showMoreButton = siteMain.querySelector(`.films-list__show-more`);

showMoreButton.addEventListener(`click`, () => {
  const prevCardsShowing = showingCardsCount;
  showingCardsCount = showingCardsCount + CARD_BUTTON;
  cards.slice(prevCardsShowing, showingCardsCount).forEach((card) => render(filmListContainer, getFilmCardsTemplate(card)));
  if (showingCardsCount >= cards.length) {
    showMoreButton.remove();
  }
});
