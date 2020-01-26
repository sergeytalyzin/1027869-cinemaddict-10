import {getRandomNumber} from "../mock/card";
import moment from 'moment';
// const castTimeFormat = (value) => {
//   return value < 10 ? `0${value}` : String(value);
// };

// const getRandomDate = () => {
//   const targetDate = new Date();
//
//   targetDate.setDate(getRandomNumber(1, 30));
//   const day = targetDate.getDate();
//   const month = targetDate.getMonth();
//   const year = targetDate.getFullYear();
//   const hours = castTimeFormat(targetDate.getHours());
//   const minutes = castTimeFormat(targetDate.getMinutes());
//   return `${year}/${month}/${day}  ${hours}:${minutes}`;
// };
const getRandomDate = () => {
  const targetDate = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sign * getRandomNumber(0, 30);
  targetDate.setMonth(targetDate.getDate() + getRandomNumber(0, 6));
  targetDate.setDate(targetDate.getDate() + diffValue);

  return targetDate;
};

const formatTime = (date) => {
  return moment(date).format(`H:mm`);
};
const formatDate = (date) => {
  return moment(date).format(`DD MMMM YYYY`);
};

export {getRandomDate, formatTime, formatDate};
