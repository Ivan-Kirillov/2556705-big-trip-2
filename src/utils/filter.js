import {FilterType} from '../const';

function isPointInFuture (point) {
  return point.dateFrom > new Date();
}

function isPointInPast (point) {
  return point.dateTo < new Date();
}

function isPointInPresent (point) {
  return point.dateFrom < new Date() && point.dateTo > new Date();
}

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isPointInFuture(point)),
  [FilterType.PRESENT]: (points) => points.filter((point) => isPointInPresent(point)),
  [FilterType.PAST]: (points) => points.filter((point) => isPointInPast(point)),
};

export {filter};
