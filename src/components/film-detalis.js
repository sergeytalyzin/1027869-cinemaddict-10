import {Genre, getRandomArray, getRandomNumber} from "../mock/card";
import {DetailsNames} from "../mock/card-details";
import {getRandomDate} from "../util";

const EMOJI = [`sleeping.png`, `smile.png`, `puke.png`, `angry.png`];
const Comments = [`Шляпа `,
  `Не согласен сам ты шляпа`,
  `Крутой фильм`,
  `Да это колыбельная для моих детей)))))`,
  `Я плакал , уже на 3 -й минуте`,
  `Ко мне приходит сосед смотреть этот фильм уже 5 -ю пятницу подряд , что делать ?????????`
];


const generateComment = () => {
  return {
    emoji: getRandomArray(EMOJI),
    comment: getRandomArray(Comments),
    author: getRandomArray(DetailsNames),
    date: getRandomDate(),
  };
};

const generateComments = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateComment);
};

const arrayComments = generateComments(5);
const createComment = (array) => {
  return array.map((it) => {
    const {emoji, comment, author, date} = it;
    return (`<li class="film-details__comment">
      <span class="film-details__comment-emoji">
      <img src="./images/emoji/${emoji}" width="55" height="55" alt="emoji">
      </span>
      <div>
      <p class="film-details__comment-text">${comment}</p>
      <p class="film-details__comment-info">
      <span class="film-details__comment-author">${author}</span>
    <span class="film-details__comment-day">${date}</span>
    <button class="film-details__comment-delete">Delete</button>
      </p>
      </div>
      </li>`);
  });
};

const createGenres = (array) => {
  return [...array].map((it) => {
    return (`<span class="film-details__genre">${it}</span>`);
  }).join(`\n`);
};
const generateFilmGenre = () => {
  let genre = [];
  let count = getRandomNumber(2, 5);
  for (let i = 0; i < count; i++) {
    genre.push(Genre[getRandomNumber(0, Genre.length - 1)]);
  }
  return new Set(genre);
};
const newGenre = generateFilmGenre();


export const getFilmDetailsTemplate = (filmCard, filmCardAdditionalInfo) => {
  const {description, title, rating, duration, poster, comment, age} = filmCard;
  const {director, writers, actors, releaseDate} = filmCardAdditionalInfo;
  const genre = createGenres(newGenre);
  const commentFilm = createComment(arrayComments);

  return (`<section class="film-details">
<form class="film-details__inner" action="" method="get">
    <div class="form-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="./images/posters/${poster}" alt="">

          <p class="film-details__age">${age}</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">Original: ${title}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${rating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${[...writers]}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${[...actors]}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${releaseDate}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${duration}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">USA</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">
              ${genre}
               </td>
            </tr>
          </table>

          <p class="film-details__film-description">
             ${description}
          </p>
        </div>
      </div>

      <section class="film-details__controls">
        <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched">
        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite">
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>
    </div>

    <div class="form-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comment}</span></h3>

        <ul class="film-details__comments-list">
         ${commentFilm};
        </ul>

        <div class="film-details__new-comment">
          <div for="add-emoji" class="film-details__add-emoji-label"></div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="neutral-face">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-gpuke" value="grinning">
            <label class="film-details__emoji-label" for="emoji-gpuke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="grinning">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>
    </div>
  </form>
</section>`);
};
