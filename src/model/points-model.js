import Observable from '../framework/observable.js';
import {UpdateType} from '../const.js';

export default class PointsModel extends Observable {
  #dataApiService = null;
  #points = [];
  #offers = null;
  #destinations = null;

  constructor({dataApiService}) {
    super();
    this.#dataApiService = dataApiService;
    this.#offers = this.#dataApiService.offers;
    this.#destinations = this.#dataApiService.destinations;
    this.#dataApiService.points.then((tasks) => {
      сonsole.log(tasks.map(this.#adaptToClient));
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

  async init() {
    try {
      const points = await this.#dataApiService.points;
      this.#points = points.map(this.#adaptToClient);
    } catch(err) {
      this.#points = [];
    }

    this._notify(UpdateType.INIT);
  }

  async updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.newId === update.newId);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    try {
      const response = await this.#dataApiService.updatePoint(update);
      const updatedPoit = this.#adaptToClient(response);
      this.#points = [...this.#points.map((point, i) => (i === index) ? updatedPoit : point)];

      this._notify(updateType, updatedPoit);

    } catch(err) {
      throw new Error('Can\'t update point');
    }
  }

  async addPoint(updateType, update) {
    try {
      const response = await this.#dataApiService.addPoint(update);
      const newPoint = this.#adaptToClient(response);
      this.#points = [
        newPoint,
        ...this.#points,
      ];
      this._notify(updateType, update);
    } catch(err) {
      throw new Error('Can\'t add point');
    }
  }

  async deletePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.newId === update.newId);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    try {
      await this.#dataApiService.deletePoint(update);
      this.#points = [
        ...this.#points.slice(0, index),
        ...this.#points.slice(index + 1),
      ];
      this._notify(updateType);
    } catch(err) {
      throw new Error('Can\'t delete task');
    }
  }

  #adaptToClient(point) {
    const adaptedPoint = {...point,
      // На клиенте дата хранится как экземпляр Date
      dateFrom: point['date_from'] !== null ? new Date(point['date_from']) : point['date_from'],
      dateTo: point['date_to'] !== null ? new Date(point['date_to']) : point['date_to'],
      isFavorite: point['is_favorite'],
    };

    // Ненужные ключи мы удаляем
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
  }
}
