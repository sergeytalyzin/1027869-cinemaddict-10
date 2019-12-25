import {createElement} from "../util";

export const getFilms = () => `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

      <div class="films-list__container"></div>
</section>
  </section>`;

export default class FilmContainer {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return getFilms();
  }
  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }
}


