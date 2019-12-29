import {getRandomNumber} from "./mock/card";

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

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

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};

export const render = (container, element, place = RenderPosition.BEFOREEND) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN :
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND :
      container.append(element);
      break;
  }
};
