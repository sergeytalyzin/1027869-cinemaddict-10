import AbstractComponent from "./abstract-component";

const getNavMarkup = (filter) => {
  const {name, count, active} = filter;

  return (
    `<a href="#${name === `All movies` ? name.toLowerCase().slice(0, 3) : name.toLowerCase()}"  class="main-navigation__item ${active ? `main-navigation__item--active` : `` } ${name === `Stats` ? `main-navigation__item--additional` : `` }">
${name}${(name === `All movies` || name === `Stats`) ? `` : `<span class="main-navigation__item-count">${count}</span>` }</a>`
  );
};


export const getMainNavTemplate = (filters) => {
  const filtersMarkup = filters.map((it)=> getNavMarkup(it)).join(`\n`);
  return (
    `<nav class="main-navigation">${filtersMarkup}</nav>`
  );
};


export default class Navigation extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
    this.statsElement = null;
  }

  getTemplate() {
    return getMainNavTemplate(this._filters);
  }

  setClickStatsHandler(handler) {
    this.statsElement = this.getElement().querySelector(`.main-navigation__item--additional`);
    this.statsElement.addEventListener(`click`, handler);
  }

  setClickMainNavigationHandler(handler) {
    this.getElement().addEventListener(`click`, (evt)=> {
      if (evt.target === this.statsElement) {
        return;
      }
      handler();
    });
  }
}
