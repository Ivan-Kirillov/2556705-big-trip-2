import AbstractView from '../framework/view/abstract-view.js';
function createFilterItemTemplate(filter) {
  const {type, count} = filter;
  return (
    `<div class="trip-filters__filter">
      <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}" ${type === 'everything' ? 'checked' : ''} ${count === 0 ? 'disabled' : ''}>
      <label class="trip-filters__filter-label" for="filter-${type}">${type.toUpperCase()}</label>
    </div>`
  );
}

function createFilterTemplate(filterItems) {
  const filterItemsTemplate = filterItems
    .map((filter, index) => createFilterItemTemplate(filter, index === 0))
    .join('');

  return (
    `<form class="trip-filters" action="#" method="get">
      ${filterItemsTemplate}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
}
export default class FilterView extends AbstractView {
  #filters = null;
  #textNoPoints = null;

  constructor(filters, textNoPoints) {
    super();
    this.#filters = filters;
    this.#textNoPoints = textNoPoints;
  }

  //Геттер, который вернет точки для выбранного фильтра

  get filteredPoints() {
    const formFilters = this.element;
    const filterInputs = [...formFilters.getElementsByClassName('trip-filters__filter-input')];
    const filterInputChecked = filterInputs.find((input) => input.checked === true);
    const checkedFilter = this.#filters.find((value) => filterInputChecked.id === `filter-${value.type}`);
    const filterPoints = checkedFilter.points;
    // Проверка как поведет сайт, если filterPoints будет пустой;
    // filterPoints = []; Но надо поменять const на let у filterPoints
    return filterPoints;
  }

  get noPointsText() {
    const formFilters = this.element;
    const filterInputs = [...formFilters.getElementsByClassName('trip-filters__filter-input')];
    const filterInputChecked = filterInputs.find((input) => input.checked === true);
    const checkedFilter = this.#filters.find((value) => filterInputChecked.id === `filter-${value.type}`);

    let noPointsText = '';
    Object.entries(this.#textNoPoints).forEach((value) => {
      if(value[0] === checkedFilter.type) {
        noPointsText = value[1];
      }
    });
    return noPointsText;
  }

  get template() {
    return createFilterTemplate(this.#filters);
  }
}
