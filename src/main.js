import {getExtraFilmList} from "./components/film-extra";
import {getButtonShowMoreTemplate} from "./components/show-more-button";
import {getFilmCardsTemplate} from "./components/film-cards";
import {getFilms} from "./components/film-container";
import {getFilmDetalisTemplate} from "./components/film-detalis";
import {getMainNavTemplate} from "./components/site-navigation";
import {getProfileHeaderTemplate} from "./components/profile";
import {getSortTemplate} from "./components/sorting";
import {getStatisticTemplate} from "./components/statistic";

const FILMS_NUMBER = 5;
const EXTRA_FILMS_NUMBER = 2;
const CATEGORIES_NUMBER = 2;
const render = (container, template, position = `beforeend`) => {
  container.insertAdjacentHTML(position, template);
};

const siteBody = document.querySelector(`body`);
const header = document.querySelector(`.header`);
const siteMain = document.querySelector(`.main`);


render(header, getProfileHeaderTemplate());
render(header, getStatisticTemplate());
render(siteMain, getMainNavTemplate());
render(siteMain, getSortTemplate());
render(siteMain, getFilms());

const filmListContainer = siteMain.querySelector(`.films-list__container`);

new Array(FILMS_NUMBER).fill(``).forEach(() => render(filmListContainer, getFilmCardsTemplate()));
render(siteBody, getFilmDetalisTemplate());

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

new Array(EXTRA_FILMS_NUMBER).fill(``).forEach(() => render(extraFilmsContainerRated, getFilmCardsTemplate()));
new Array(EXTRA_FILMS_NUMBER).fill(``).forEach(() => render(extraFilmsContainerCommented, getFilmCardsTemplate()));


