import {formatTime} from "../utils/time";

const Films = [
  `Rembo`,
  `Batman`,
  `Spider Man`,
  `Tor`,
  `X-man`,
  `Halk`,
  `Harry Potter`,
  `Chip and Dail`,
  `Mario`,
  `The Wolf of Wall Street`,
  `Limitless`,
];

const Posters = [`made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`
];
const AGES = [`0+`, `12+`, `16+`, `18+`];
const Genre = [`Musical`, `Western`, `Comedy`, `Drama`, `Cartoon`, `Mystery`];

const Description = [`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`];

const getRandomRating = (min, max) => {
  return (min + (max - min) * Math.random()).toFixed(2);
};

const getRandomNumber = (min, max) => {
  return min + Math.floor((max - min) * Math.random());
};

const getRandomArray = (array) => {
  return array[getRandomNumber(0, array.length - 1)];
};

const getRandomDuration = () => {
  let hours = Math.floor(getRandomNumber(0, 3));
  let minutes = getRandomNumber(0, 60);
  return {
    h: hours,
    m: minutes
  };
};

const getRandomDescription = () => {
  let count = getRandomNumber(1, 3);
  let Desc = ``;

  for (let i = 0; i < count; i++) {
    Desc = Desc + Description[getRandomNumber(0, Description.length - 1)];
  }
  return Desc;
};
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
  return `${getRandomNumber(1, 30)}  ${getRandomArray(MONTH_NAMES)}  ${getRandomNumber(1940, 2019)}`;
};

const generateCard = () => {
  return {
    id: String(Math.random()),
    title: getRandomArray(Films),
    rating: getRandomRating(0, 10),
    year: getRandomNumber(1950, 2020),
    duration: formatTime(getRandomDuration()),
    genre: getRandomArray(Genre),
    poster: getRandomArray(Posters),
    description: getRandomDescription(),
    comment: getRandomNumber(1, 10),
    age: getRandomArray(AGES),
    director: getRandomArray(DetailsNames),
    writers: new Set(generateListNames(DetailsNames)),
    actors: new Set(generateListNames(DetailsNames)),
    releaseDate: generateDate(),
    watchlist: Math.random() > 0.5,
    watched: false,
    favorite: Math.random() > 0.5
  };
};

const generateCardsFilms = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateCard);
};


export {generateCard, generateCardsFilms, getRandomNumber, getRandomArray, Genre, DetailsNames};
