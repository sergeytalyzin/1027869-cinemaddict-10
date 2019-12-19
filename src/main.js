import FilmExtra from "./components/film-extra";
import ShoweMoreButton from "./components/show-more-button";
import FilmCard from "./components/film-card";
import FilmContainer from "./components/film-container";
import FilmDetalis from "./components/film-detalis";
import Navigation from "./components/navigation";
import Sorting from "./components/sorting";
import Statistic from "./components/statistic";
import Profile from "./components/profile";
import {generateCardsFilms} from "./mock/card";
import {generateFilterStatistic} from "./mock/statistic-filters";
import {generateTable} from "./mock/card-details";
import {render} from "./util";


const FILMS_TIMES = 22;
const CARDS_INDICATOR = 5;
const CARDS_INDICATOR_EXTRA = 2;
const CATEGORIES_NUMBER = 2;
const CARD_BUTTON = 5;
// const render = (container, template, position = `beforeend`) => {
//   container.insertAdjacentHTML(position, template);
// };

const siteBody = document.querySelector(`body`);
const header = document.querySelector(`.header`);
const siteMain = document.querySelector(`.main`);

const renderCard = (container, card, cardEditionInfo) => {
  const filmCard = new FilmCard(card).getElement();

  const title = filmCard.querySelector(`.film-card__title`);
  const comments = filmCard.querySelector(`.film-card__comments`);
  const poster = filmCard.querySelector(`.film-card__poster`);

  const showPopup = () => {
    const popup = new FilmDetalis(card, cardEditionInfo).getElement();
    render(siteBody, popup);
    const closePopup = () => {
      popup.remove();
      button.removeEventListener(`click`, closePopup);
    };
    const button = popup.querySelector(`.film-details__close-btn`);
    button.addEventListener(`click`, closePopup);
  };
  title.addEventListener(`click`, showPopup);
  comments.addEventListener(`click`, showPopup);
  poster.addEventListener(`click`, showPopup);
  render(container, filmCard);
};

render(header, new Profile().getElement());

render(siteMain, new Navigation().getElement());
const filter = generateFilterStatistic();
render(siteMain, new Statistic(filter).getElement());
render(siteMain, new Sorting().getElement());
render(siteMain, new FilmContainer().getElement());

const filmListContainer = siteMain.querySelector(`.films-list__container`);
const cards = generateCardsFilms(FILMS_TIMES);


const cardDetails = generateTable();

let showingCardsCount = CARDS_INDICATOR;
cards.slice(0, showingCardsCount).forEach((card) => renderCard(filmListContainer, card, cardDetails));

const filmList = siteBody.querySelector(`.films-list`);
render(filmList, new ShoweMoreButton().getElement());
const films = siteBody.querySelector(`.films`);

new Array(CATEGORIES_NUMBER).fill(``).forEach(() => render(films, new FilmExtra().getElement()));
const extraTitles = siteBody.querySelectorAll(`.films-list__title`);
extraTitles[1].textContent = `Top rated`;
extraTitles[2].textContent = `Most commented`;

const extraFilms = siteBody.querySelectorAll(`.films-list--extra`);
const extraFilmsContainerRated = extraFilms[0].querySelector(`.films-list__container`);
const extraFilmsContainerCommented = extraFilms[1].querySelector(`.films-list__container`);

cards.slice(0, CARDS_INDICATOR_EXTRA).forEach((card) => renderCard(extraFilmsContainerRated, card));
cards.slice(0, CARDS_INDICATOR_EXTRA).forEach((card) => renderCard(extraFilmsContainerCommented, card));

const showMoreButton = siteMain.querySelector(`.films-list__show-more`);

showMoreButton.addEventListener(`click`, () => {
  const prevCardsShowing = showingCardsCount;
  showingCardsCount = showingCardsCount + CARD_BUTTON;
  cards.slice(prevCardsShowing, showingCardsCount).forEach((card) => renderCard(filmListContainer, card));
  if (showingCardsCount >= cards.length) {
    showMoreButton.remove();
  }
});
