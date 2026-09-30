// Вставлять в .trip-events
import AbstractView from '../framework/view/abstract-view.js';
function createSortTemplate(sortItems) {
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${sortItems.map((sortItem) => (
      `<div class="trip-sort__item  trip-sort__item--${sortItem}">
      <input id="sort-${sortItem}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sortItem}">
      <label class="trip-sort__btn" for="sort-${sortItem}">${sortItem}</label>
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
