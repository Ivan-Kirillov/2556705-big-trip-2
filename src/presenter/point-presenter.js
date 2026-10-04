import {render, replace, remove} from '../framework/render.js';
import PointView from '../view/point-view.js';
import PointEditView from '../view/point-edit-view.js';

export default class PointPresenter {
  #pointsListContainer = null;
  #pointComponent = null;
  #pointEditComponent = null;
  #pointsModel;
  #point = null;
  #destinations;
  #offers;

  constructor({pointsListContainer, pointsModel}) {
    this.#pointsListContainer = pointsListContainer;
    this.#pointsModel = pointsModel;
    this.#destinations = this.#pointsModel.destinations;
    this.#offers = this.#pointsModel.offers;
  }

  init(point) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new PointView(
      point, this.#destinations, this.#offers, () => {
        this.#replaceCardToForm();
        document.addEventListener('keydown', this.#escKeyDownHandler);
      }
    );

    this.#pointEditComponent = new PointEditView(
      point, this.#destinations, this.#offers, () => {
        this.#replaceFormToCard();
        document.removeEventListener('keydown', this.#escKeyDownHandler);
      }
    );

    // render(this.#pointComponent, this.#pointsListContainer);
    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#pointsListContainer);
      return;
    }

    // Проверка на наличие в DOM необходима,
    // чтобы не пытаться заменить то, что не было отрисовано
    if (this.#pointsListContainer.contains(prevPointComponent.element)) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#pointsListContainer.contains(prevPointEditComponent.element)) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToCard();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #replaceCardToForm() {
    replace(this.#pointEditComponent, this.#pointComponent);
  }

  #replaceFormToCard() {
    replace(this.#pointComponent, this.#pointEditComponent);
  }
}
