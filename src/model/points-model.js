import Observable from '../framework/observable.js';
import { getRandomPoint } from '../mocks/points.js';
import { offers } from '../mocks/offers.js';
import { destinations } from '../mocks/destinations.js';

const POINT_COUNT = 3;
export default class PointsModel extends Observable {
  #dataApiService = null;
  #points = Array.from({length: POINT_COUNT}, getRandomPoint);
  #offers = offers;
  #destinations = destinations;

  constructor({dataApiService}) {
    super();
    this.#dataApiService = dataApiService;
    // this.#offers = this.#dataApiService.parseResponse(this.#dataApiService.offers);
    // this.#destinations = this.#dataApiService.parseResponse(this.#dataApiService.destinations);
    this.#dataApiService.points.then((tasks) => {
      console.log(tasks);
      // Есть проблема: cтруктура объекта похожа, но некоторые ключи называются иначе,
      // а ещё на сервере используется snake_case, а у нас camelCase.
      // Можно, конечно, переписать часть нашего клиентского приложения, но зачем?
      // Есть вариант получше - паттерн "Адаптер"
    });
  }

  get points() {
    return this.#points;
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }

  updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.newId === update.newId);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this.#points = [...this.#points.map((point, i) => (i === index) ? update : point)];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this.#points = [
      update,
      ...this.#points,
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.newId === update.newId);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType);
  }
}
