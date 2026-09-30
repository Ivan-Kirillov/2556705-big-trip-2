import AbstractView from '../framework/view/abstract-view.js';

function createNoPointTemplate(textNoPoints) {
  return (
    `<p class="trip-events__msg">
      ${textNoPoints}
    </p>`
  );
}
export default class NoPointView extends AbstractView {
  #textNoPoints = null;

  constructor(textNoPoints) {
    super();
    this.#textNoPoints = textNoPoints;
  }

  get template() {
    return createNoPointTemplate(this.#textNoPoints);
  }
}
