import Navigation from "./components/navigation";
import Statistic from "./components/statistic";
import Profile from "./components/profile";
import {generateCardsFilms} from "./mock/card";
import {generateFilterStatistic} from "./mock/statistic-filters";
import {render} from "./utils/render";
import PageController from "./controllers/page-controller";
import Movies from "./models/movies";


const FILMS_TIMES = 22;
const header = document.querySelector(`.header`);
const siteMain = document.querySelector(`.main`);


render(header, new Profile().getElement());

render(siteMain, new Navigation().getElement());
const filter = generateFilterStatistic();
render(siteMain, new Statistic(filter).getElement());

const cards = generateCardsFilms(FILMS_TIMES);
const moviesModel = new Movies();
moviesModel.setCards(cards);

const pageController = new PageController(moviesModel);
pageController.render();


