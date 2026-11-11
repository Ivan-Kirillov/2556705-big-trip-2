import AbstractView from '../framework/view/abstract-view.js';

function createLoadingTemplate(messageFromServer) {
  return (
    `<p class="trip-events__msg">
      ${messageFromServer}
    </p>`
  );
}

export default class LoadingView extends AbstractView {
  #pointsModel = null;
  #messageFromServer = null;

  constructor(PointsModel) {
    super();
    this.#pointsModel = PointsModel;
    this.#messageFromServer = this.#pointsModel.messageFromServer() || 'Loading';
  }

  get template() {
    return createLoadingTemplate(this.#messageFromServer);
  }
}
