import Navigation from "./components/navigation";
import Sorting from "./components/sorting";
import Statistic from "./components/statistic";
import Profile from "./components/profile";
import {generateCardsFilms} from "./mock/card";
import {generateFilterStatistic} from "./mock/statistic-filters";
import {render} from "./utils/render";
import PageController from "./controllers/page-controller";


const FILMS_TIMES = 22;
const header = document.querySelector(`.header`);
const siteMain = document.querySelector(`.main`);


render(header, new Profile().getElement());

render(siteMain, new Navigation().getElement());
const filter = generateFilterStatistic();
render(siteMain, new Statistic(filter).getElement());
render(siteMain, new Sorting().getElement());

const cards = generateCardsFilms(FILMS_TIMES);
const pageController = new PageController();
pageController.render(cards);


