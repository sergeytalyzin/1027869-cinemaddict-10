import {createElement} from "../util";

export const getExtraFilmList = () => `<section class="films-list--extra">
      <h2 class="films-list__title"></h2>

      <div class="films-list__container"></div>
    </section>`;

export default class FilmExtra {
  constructor () {
    this._element = null;
  }

  getTemplate() {
    return getExtraFilmList();
  }

  getElement(){
    if(!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }
}
