import AbstractView from '../framework/view/abstract-view.js';
function createFilterItemTemplate(filter) {
  const {type, points, count} = filter;
  return (
    `<div class="trip-filters__filter">
      <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}" ${type == 'everything' ? 'checked' : ''} ${count == 0 ? 'disabled' : ''}>
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
    // Создаем массив и наполняем его "живой" коллекцией filter-input
    const filterInputs = formFilters.getElementsByClassName('trip-filters__filter-input');




    // Добавляет обработчики событий для всех filter-input (через родителя, т.е. form задать обработчик почему-то не удалось)

    // Находим выбранный фильтер и выбираем точки для данного фильтра(filterPoints)
    const filterInputChecked = filterInputs.find((input) => input.checked == true);
    const checkedFilter = this.#filters.find((value) => filterInputChecked.id == `filter-${value.type}`);
    let filterPoints = checkedFilter.points;
    // Проверка как поведет сайт, если filterPoints будет пустой;
    // filterPoints = [];
    return filterPoints;
  }

  get noPointsText() {
    const formFilters = document.querySelector('.trip-filters');
    // Создаем массив и наполняем его "живой" коллекцией filter-input
    const filterInputs = [];
    for (let i = 0; i < formFilters.children.length - 1; i++) {
      const filterInput = formFilters.children[i].children[0];
      filterInputs.push(filterInput);
    }

    const filterInputChecked = filterInputs.find((input) => input.checked == true);
    const checkedFilter = this.#filters.find((value) => filterInputChecked.id == `filter-${value.type}`);

    let noPointsText = '';
    Object.entries(this.#textNoPoints).forEach((value) => {
      if(value[0] == checkedFilter.type) {
        noPointsText = value[1];
      }
    });
    return noPointsText;
  }

  get template() {
    return createFilterTemplate(this.#filters);
  }
}
