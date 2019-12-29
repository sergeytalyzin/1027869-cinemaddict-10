
import AbstractComponent from "./abstract-component";

export const getButtonShowMoreTemplate = () => `<button class="films-list__show-more">Show more</button>`;

export default class ShowMoreButton extends AbstractComponent {
  getTemplate() {
    return getButtonShowMoreTemplate();
  }
}
