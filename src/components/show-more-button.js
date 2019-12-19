import {createElement} from "../util";

export const getButtonShowMoreTemplate = () => `<button class="films-list__show-more">Show more</button>`;

export default class ShoweMoreButton {
  constructor() {
    this._element = null;
  }
  getTemplate() {
    return getButtonShowMoreTemplate();
  }

  getElement () {
    if(!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return  this._element;
  }
}
