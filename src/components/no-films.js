import {createElement} from "../util";

const getNoFilmsTemplate = () =>{
  return (`<section class="films">
    <section class="films-list">
      <h2 class="films-list__title">There are no movies in our database</h2>
    </section>
  </section>`)};

export default class NoFilms {
  constructor () {
    this._element = null;
  }
  getTemplate () {
    return getNoFilmsTemplate();
  }
  getElement () {
    if(!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }
}
