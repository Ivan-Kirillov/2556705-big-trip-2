import { NO_POINTS_TEXT_TYPE } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';

function createNoPointTemplate(filterType) {
  const noPointTextValue = NO_POINTS_TEXT_TYPE[filterType];
  return (
    `<p class="trip-events__msg">
      ${noPointTextValue}
    </p>`
  );
}
export default class NoPointView extends AbstractView {
  #filterType = null;

  constructor({ filterType }) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoPointTemplate(this.#filterType);
  }
}
