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
  let minutes = getRandomNumber(30, 150);
  if (minutes < 60) {
    return minutes + `min`;
  }
  return Math.floor(minutes / 60) + `h ` + (minutes % 60) + `min`;
};

const getRandomDescription = () => {
  let count = getRandomNumber(1, 3);
  let Desc = ``;

  for (let i = 0; i < count; i++) {
    Desc = Desc + Description[getRandomNumber(0, Description.length - 1)];
  }
  return Desc;
};

const generateCard = () => {
  return {
    title: getRandomArray(Films),
    rating: getRandomRating(0, 10),
    year: getRandomNumber(1950, 2020),
    duration: getRandomDuration(),
    genre: getRandomArray(Genre),
    poster: getRandomArray(Posters),
    description: getRandomDescription(),
    comment: getRandomNumber(1, 10),
    age: getRandomArray(AGES),
    watchlist: Math.random() > 0.5,
    watched: Math.random() > 0.5,
    favorite: Math.random() > 0.5
  };
};

const generateCardsFilms = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateCard);
};

export {generateCard, generateCardsFilms, getRandomNumber, getRandomArray, Genre};
