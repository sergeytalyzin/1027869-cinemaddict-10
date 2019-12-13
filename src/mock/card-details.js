import {getRandomNumber} from "./card";
import {getRandomArray} from "./card";

const MONTH_NAMES = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`,
];
const DetailsNames = [`Frank Sinatra`, `John Mason`, `Anthony Mann`, `Bred Pitt`, `Heinz Herald`, `Richard Weil`, `Anne Wigton`,
  `Erich von Stroheim`, `Mary Beth Hughes`, `Dan Duryea`];

const generateListNames = (names) => {
  return names.filter(()=> Math.random() > 0.5);
};

const generateDate = () => {
  return `${getRandomNumber(1, 30)}  ${getRandomArray(MONTHNAMES)}  ${getRandomNumber(1940, 2019)}`;
};

const generateTable = () => {
  return {
    director: getRandomArray(DetailsNames),
    writers: new Set(generateListNames(DetailsNames)),
    actors: new Set(generateListNames(DetailsNames)),
    releaseDate: generateDate(),
  };
};

export {generateTable, DetailsNames};

