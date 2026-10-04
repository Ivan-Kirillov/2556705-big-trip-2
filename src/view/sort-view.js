// Вставлять в .trip-events
import AbstractView from '../framework/view/abstract-view.js';
function createSortTemplate(sortItems) {
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${Object.entries(sortItems).map((sortItem) => (
      `<div class="trip-sort__item  trip-sort__item--${sortItem[1]}">
      <input id="sort-${sortItem[1]}" class="trip-sort__input  visually-hidden" data-sort-type="${sortItem[1]}" type="radio" name="trip-sort" value="sort-${sortItem[1]}">
      <label class="trip-sort__btn" for="sort-${sortItem[1]}">${sortItem[1]}</label>
    </div>`
    )).join('')}
    </form>`
  );
}

export default class SortView extends AbstractView {
  #sorting = null;

  constructor(sorting) {
    super();
    this.#sorting = sorting;
  }

  get template() {
    return createSortTemplate(this.#sorting);
  }
}
