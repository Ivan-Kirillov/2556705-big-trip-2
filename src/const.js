export const POINT_TYPES = ['taxi', 'drive', 'bus', 'train', 'ship', 'flight', 'check-in', 'sightseeing', 'restaurant'];

export const HOURS_IN_DAY = 24;
export const MILLISECONDS_IN_MINUTE = 60000;
export const MINUTES_IN_HOUR = 60;
export const DATE_FORMAT = {
  'classic-date': 'YYYY-MM-DD',
  'full-date': 'DD/MM/YY hh:mm',
  'hours-minutes': 'hh:mm',
  'full-hours-minutes': 'HH:mm',
  'minutes': 'mm',
  // 'date': 'DD',
  'month': 'MMM',
  'date-month': 'DD MMM',
};

export const DEFAULT_POINT = {
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  destination: 0,
  isFavorite: false,
  offers: [],
  type: POINT_TYPES[0],
};

export const DEFAULT_TEXT_FROM_SERVER = 'Loading...';

export const NO_POINTS_TEXT_TYPE = {
  everything: 'Click New Event to create your first point',
  present: 'There are no present events now',
  future: 'There are no future events now',
  past: 'There are no past events now',
};

export const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

export const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offer'
};

export const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};
