import AbstractComponent from "./abstract-component";
export const SortType = {
  DATE: `date`,
  RATING: `rating`,
  DEFAULT: `default`
};

const sortType = Object.values(SortType);

const getSortTemplate = () => `<ul class="sort">
    ${createSort(sortType)}
  </ul>`;
const createSort = (array) => {
  return [...array].map((it) => {
    return (`<li><a href="#" data-sort-type ="${it}"  class="sort__button">Sort by ${it}</a></li>`);
  }).join(`\n`);
};

export default class Sorting extends AbstractComponent {
  constructor() {
    super();
    this._currenSortType = SortType.DEFAULT;
    this.save = null;
  }
  getTemplate() {
    return getSortTemplate();
  }
  setSortTypeHandler(handler) {
    this._element.addEventListener(`click`, (evt)=> {
      evt.preventDefault();
      if (this.save && this.save !== evt.target) {
        this.save.classList.remove(`sort__button--active`);
      }
      if (evt.target.tagName !== `A`) {
        return;
      }
      const sortType = evt.target.dataset.sortType;
      if (this._currenSortType === sortType) {
        return;
      }
      this._currenSortType = sortType;
      evt.target.classList.add(`sort__button--active`);
      this.save = evt.target;
      handler(this._currenSortType);
    });
  }
}
