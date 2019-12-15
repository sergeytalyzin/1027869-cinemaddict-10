import {getRandomNumber} from "./mock/card";

const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

const getRandomDate = () => {
  const targetDate = new Date();

  targetDate.setDate(getRandomNumber(1, 30));
  const day = targetDate.getDate();
  const month = targetDate.getMonth();
  const year = targetDate.getFullYear();
  const hours = castTimeFormat(targetDate.getHours());
  const minutes = castTimeFormat(targetDate.getMinutes());
  return `${year}/${month}/${day}  ${hours}:${minutes}`;
};

export {getRandomDate};
