import { render, replace } from '../framework/render.js';
import {generateFilter} from '../mocks/filter.js';
import {SORT_ITEMS} from '../const.js';
import {TEXT_NO_POINTS} from '../const.js';
import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import PointEditView from '../view/point-edit-view.js';
import PointView from '../view/point-view.js';
import NoPointView from '../view/no-points-view.js';
import FilterView from '../view/filter-view.js';
export default class TripPresenter {
  #tripContainer;
  #pointsModel;
  #boardPoints;
  #destinations;
  #offers;
  #eventListComponent = new EventListView();

  constructor({ tripContainer, pointsModel }) {
    this.#tripContainer = tripContainer;
    this.#pointsModel = pointsModel;
    this.#destinations = this.#pointsModel.destinations;
    this.#offers = this.#pointsModel.offers;
  }

  init() {
    this.#boardPoints = this.#pointsModel.points;
    // Получаем точки для выбранного фильтра (filteredPoints) и вставляем их в render вместо this.#boardPoints
    const filters = generateFilter(this.#boardPoints);
    const filterView = new FilterView(filters, TEXT_NO_POINTS);
    const filteredPoints = filterView.filteredPoints;
    const sortView = new SortView(SORT_ITEMS);
    render(sortView, this.#tripContainer);
    render(this.#eventListComponent, this.#tripContainer);
    if (filteredPoints.length === 0) {
      render(new NoPointView(filterView.noPointsText), this.#eventListComponent.element);
      return;
    }

    for (let i = 0; i < filteredPoints.length; i++) {
      this.#renderPoint(filteredPoints[i]);
    }
  }

  #renderPoint(point) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointComponent = new PointView(
      point, this.#destinations, this.#offers, onEditClick
    );

    function onEditClick() {
      replaceCardToForm();
      document.addEventListener('keydown', escKeyDownHandler);
    }

    const pointEditComponent = new PointEditView(
      point, this.#destinations, this.#offers, onFormSubmit
    );

    function onFormSubmit() {
      replaceFormToCard();
      document.removeEventListener('keydown', escKeyDownHandler);
    }

    function replaceCardToForm() {
      replace(pointEditComponent, pointComponent);
    }

    function replaceFormToCard() {
      replace(pointComponent, pointEditComponent);
    }
    render(pointComponent, this.#eventListComponent.element);
  }
}
