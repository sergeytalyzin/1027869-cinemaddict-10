import Profile from "./components/profile";
import {generateCardsFilms} from "./mock/card";
import {render} from "./utils/render";
import PageController from "./controllers/page-controller";
import Movies from "./models/movies";
import FilterController from "./controllers/filter-controller";


const FILMS_TIMES = 22;
const header = document.querySelector(`.header`);
const siteMain = document.querySelector(`.main`);

const cards = generateCardsFilms(FILMS_TIMES);
const moviesModel = new Movies();
moviesModel.setCards(cards);

render(header, new Profile().getElement());


const filterController = new FilterController(siteMain, moviesModel);
filterController.render();


const pageController = new PageController(moviesModel);
pageController.render();


