import AbstractComponent from "./abstract-component";
export const SortType = {
  DATE: `date`,
  RATING: `rating`,
  DEFAULT: `default`
};

const getSortTemplate = (obj) => `<ul class="sort">
    <li><a href="#" data-sort-type ="${obj.DEFAULT}"  class="sort__button sort__button--active">Sort by default</a></li>
    <li><a href="#" data-sort-type ="${obj.DATE}" class="sort__button">Sort by date</a></li>
    <li><a href="#" data-sort-type ="${obj.RATING}" class="sort__button">Sort by rating</a></li>
  </ul>`;

export default class Sorting extends AbstractComponent {
  constructor() {
    super();
    this._currenSortType = SortType.DEFAULT;
  }
  getTemplate() {
    return getSortTemplate(SortType);
  }
  setSortTypeHandler(handler) {
    this._element.addEventListener(`click`, (evt)=> {
      evt.preventDefault();
      if (evt.target.tagName !== `A`) {
        return;
      }
      const sortType = evt.target.dataset.sortType;
      if (this._currenSortType === sortType) {
        return;
      }
      this._currenSortType = sortType;
      handler(this._currenSortType);
    });
  }
}
