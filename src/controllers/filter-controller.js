import Navigation from "../components/navigation";
import {render, RenderPosition} from "../utils/render";
import {generateFilterStatistic} from "../mock/statistic-filters";
import Statistic from "../components/statistic";
import {FilterType} from "../const";
import {getMoviesByFilter} from "../utils/navigationFilter";

const filter = generateFilterStatistic();

export default class FilterController {
  constructor(container, moviesModel) {
    this._container = container;
    this._activeFilterType = FilterType.ALLMOVIES;
    this._navigation = null;
    this._statistic = null;
    this.moviesModel = moviesModel;

    this.renderStatistic = this.renderStatistic.bind(this);
    this.removeStats = this.removeStats.bind(this);
  }

  render() {
    const container = this._container;
    const allFilms = this.moviesModel.getAllCards();

    const filters = Object.values(FilterType).map((filterType)=> {
      return {
        name: filterType,
        count: getMoviesByFilter(allFilms, filterType).length,
        active: filterType === this._activeFilterType
      };
    });
    this._navigation = new Navigation(filters);

    render(container, this._navigation.getElement());
    this._navigation.setClickStatsHandler(this.renderStatistic);
    this._navigation.setClickMainNavigationHandler(this.removeStats);

  }

  renderStatistic() {
    if (!this._statistic) {
      this._statistic = new Statistic(filter);
      render(this._navigation.getElement(), this._statistic.getElement(), RenderPosition.AFTEREND);
    }
  }

  removeStats() {
    if (!this._statistic) {
      return;
    }
    this._statistic.getElement().remove();
    this._statistic = null;
  }
}
