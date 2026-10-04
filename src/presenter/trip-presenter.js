import { render, replace, RenderPosition } from '../framework/render.js';
import {SORT_ITEMS} from '../const.js';
import SortView from '../view/sort-view.js';
import PointsListView from '../view/points-list-view.js';
import PointPresenter from './point-presenter.js';
/*
Реализация текста в случае отсутствия точек маршрута в данный момент не возможна
import NoPointView from '../view/no-points-view.js';
*/
export default class TripPresenter {
  #tripContainer;
  #pointsModel;
  #boardPoints;
  #destinations;
  #offers;
  #sortView = new SortView(SORT_ITEMS);
  #pointsListComponent = new PointsListView();

  constructor({ tripContainer, pointsModel }) {
    this.#tripContainer = tripContainer;
    this.#pointsModel = pointsModel;
    this.#destinations = this.#pointsModel.destinations;
    this.#offers = this.#pointsModel.offers;
  }

  init() {
    this.#boardPoints = this.#pointsModel.points;
    // Получаем точки для выбранного фильтра (filteredPoints) и вставляем их в render вместо this.#boardPoints
    // const filteredPoints = this.#boardPoints;
    this.#renderBoard();
    /* т.к. filterView был перенесен в main.js, то реализация отрисовки текста при отсутствии точек маршрута невозможна на данный
    if (filteredPoints.length === 0) {
      render(new NoPointView(filterView.noPointsText), this.#eventListComponent.element);
      return;
    }*/
  }

  #renderPoint(point) {
    const taskPresenter = new PointPresenter({
      pointsListContainer: this.#pointsListComponent.element, pointsModel: this.#pointsModel});
    taskPresenter.init(point);
  }

  #renderPoints() {
    for (let i = 0; i < this.#boardPoints.length; i++) {
      this.#renderPoint(this.#boardPoints[i]);
    }
  }

  #renderPointsList() {
    render(this.#pointsListComponent, this.#tripContainer);
    this.#renderPoints();
  }

  #renderSort() {
    render(this.#sortView, this.#tripContainer, RenderPosition.AFTERBEGIN);
  }

  #renderBoard() {
    this.#renderPointsList();
    this.#renderSort();
  }
}
