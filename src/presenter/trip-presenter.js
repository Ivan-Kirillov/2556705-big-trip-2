import { render, RenderPosition } from '../framework/render.js';
import { SORT_ITEMS } from '../const.js';
import {updateItem} from '../utils/utils.js';
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
  #tripPoints;
  #destinations;
  #offers;
  #sortView = new SortView(SORT_ITEMS);
  #pointsListComponent = new PointsListView();
  #pointPresenters = new Map();

  constructor({ tripContainer, pointsModel }) {
    this.#tripContainer = tripContainer;
    this.#pointsModel = pointsModel;
    this.#destinations = this.#pointsModel.destinations;
    this.#offers = this.#pointsModel.offers;
  }

  init() {
    this.#tripPoints = this.#pointsModel.points;
    // Получаем точки для выбранного фильтра (filteredPoints) и вставляем их в render вместо this.#tripPoints
    // const filteredPoints = this.#tripPoints;
    this.#renderTrip();
    /* т.к. filterView был перенесен в main.js, то реализация отрисовки текста при отсутствии точек маршрута невозможна на данный
    if (filteredPoints.length === 0) {
      render(new NoPointView(filterView.noPointsText), this.#eventListComponent.element);
      return;
    }*/
  }

  #handlePointChange = (updatedPoint) => {
    this.#tripPoints = updateItem(this.#tripPoints, updatedPoint);
    this.#pointPresenters.get(updatedPoint.newId).init(updatedPoint);
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointsListContainer: this.#pointsListComponent.element, pointsModel: this.#pointsModel, onDataChange: this.#handlePointChange, onModeChange: this.#handleModeChange
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.newId, pointPresenter);
  }

  #renderPoints() {
    for (let i = 0; i < this.#tripPoints.length; i++) {
      this.#renderPoint(this.#tripPoints[i]);
    }
  }

  #renderPointsList() {
    render(this.#pointsListComponent, this.#tripContainer);
    this.#renderPoints();
  }

  #clearPointsList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderSort() {
    render(this.#sortView, this.#tripContainer, RenderPosition.AFTERBEGIN);
  }

  #renderTrip() {
    this.#renderPointsList();
    this.#renderSort();
  }
}
