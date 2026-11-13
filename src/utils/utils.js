import dayjs from 'dayjs';
import {
  HOURS_IN_DAY,
  MILLISECONDS_IN_MINUTE,
  MINUTES_IN_HOUR,
} from '../const';

function humanizePointDueDate(date, format) {
  return date ? dayjs(date).format(format) : '';
}

function getDuration(start, end) {
  const totalMinutes = Math.floor((dayjs(end).diff(dayjs(start))) / MILLISECONDS_IN_MINUTE);
  const days = Math.floor(totalMinutes / (MINUTES_IN_HOUR * HOURS_IN_DAY));
  const daysStringFormat = ((days >= 10) ? `${days}D` : `0${days}D`);
  const hours = Math.floor((totalMinutes % (MINUTES_IN_HOUR * HOURS_IN_DAY)) / MINUTES_IN_HOUR);
  const hoursStringFormat = ((hours >= 10) ? `${hours}H` : `0${hours}H`);
  const minutes = totalMinutes % MINUTES_IN_HOUR;
  const minutesStringFormat = ((minutes >= 10) ? `${minutes}M` : `0${minutes}M`);
  switch (true) {
    case totalMinutes < MINUTES_IN_HOUR:
      return minutesStringFormat;
    case totalMinutes < (MINUTES_IN_HOUR * HOURS_IN_DAY):
      return `${hoursStringFormat} ${minutesStringFormat}`;
    default:
      return `${daysStringFormat} ${hoursStringFormat} ${minutesStringFormat}`;
  }
}

function sortPointDay(pointA, pointB) {
  return dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
}

function sortPointTime(pointA, pointB) {
  return (dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom))) - (dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom)));
}

function sortPointPrice(pointA, pointB) {
  return pointB.basePrice - pointA.basePrice;
}

function isOffersInPoint(point, offers) {
  const typeOffers = offers?.find((offer) => offer.type === point.type).offers || 'taxi';
  const pointOffers = typeOffers.filter((typeOffer) => point.offers.includes(typeOffer.id));
  return pointOffers !== null;
}

function checkServerError (points, offers, destinations) {
  return points.length === 0 || offers.length === 0 || destinations.length === 0;
}

function getTotalTripPrice (points, offers) {
  const basePrice = points.map((point) => point.basePrice);
  const totalBasePrice = basePrice.reduce((total, value) =>
    total + (Number(value) || 0), 0);
  // ! Вычисляем offersPrice для всех точек маршрута
  // 1) Массив, сосоящий из массивов, содержащих id предложений
  const bigArrayPointsOffers = points.map((point) => point.offers);
  // 2) Массив из значений всех id offers
  const totalOffers = [];
  bigArrayPointsOffers.forEach((pointOffers) => {
    pointOffers.forEach((pointOffer) => totalOffers.push(pointOffer));
  });
  // 3) Массив, сосоящий из массивов offers, каждый из которых принадлежит offers
  const offersInOffers = offers.map((currentOffer) => currentOffer.offers);
  // 4) Создаем масссив, который будет содержать все offersPrice
  const offersPrice = [];
  totalOffers.forEach((offerId) => {
    offersInOffers.forEach((offersInOffer) => {
      offersInOffer.forEach((offerInOffer) => {
        if(offerInOffer.id === offerId) {
          offersPrice.push(offerInOffer.price);
        }
      });
    });
  });
  // 5) Вычисляем offersPrice для всех точек маршрута
  const totalOffersPrice = offersPrice.reduce((total, value) => total + (Number(value) || 0), 0);
  const totalPrice = totalOffersPrice + totalBasePrice;
  return totalPrice;
}

export { humanizePointDueDate, getDuration, sortPointDay, sortPointTime, sortPointPrice, isOffersInPoint, checkServerError, getTotalTripPrice };

