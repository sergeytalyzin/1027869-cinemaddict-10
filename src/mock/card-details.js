import {getRandomNumber} from "./card";
import {getRandomArray} from "./card";

const MonthNames = [
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

const generateListName = (names) => {
  return names.filter(()=> Math.random() > 0.5);
};

const generateDate = () => {
  return `${getRandomNumber(1, 30)}  ${getRandomArray(MonthNames)}  ${getRandomNumber(1940, 2019)}`;
};

const generateTable = () => {
  return {
    director: getRandomArray(DetailsNames),
    writers: new Set(generateListName(DetailsNames)),
    actors: new Set(generateListName(DetailsNames)),
    releaseDate: generateDate(),
  };
};

export {generateTable, DetailsNames};

