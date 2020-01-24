import {Genre, getRandomArray, getRandomNumber} from "../mock/card";
import {DetailsNames} from "../mock/card";
import {getRandomDate} from "../utils/time";
import AbstractSmartComponent from "./abstract-smart-component";
import FilmDetailsWithRating from "./film-details-with-rating";
const NUMBER_OF_ADDITIVES = 5;
const EMOJI = [`sleeping.png`, `smile.png`, `puke.png`, `angry.png`];
export const Emoji = {
  SMILE: `smile`,
  PUKE: `puke`,
  SLEEPING: `sleeping`,
  ANGRY: `angry`
};
const COMMENTS = [`Шляпа `,
  `Не согласен сам ты шляпа`,
  `Крутой фильм`,
  `Да это колыбельная для моих детей)))))`,
  `Я плакал , уже на 3 -й минуте`,
  `Ко мне приходит сосед смотреть этот фильм уже 5 -ю пятницу подряд , что делать ?????????`
];


const generateComment = () => {
  return {
    emoji: getRandomArray(EMOJI),
    comment: getRandomArray(COMMENTS),
    author: getRandomArray(DetailsNames),
    date: getRandomDate(),
  };
};

const generateComments = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateComment);
};

const arrayComments = generateComments(NUMBER_OF_ADDITIVES);
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


export const getFilmDetailsTemplate = (filmCard) => {
  const {description, title, rating, duration, poster, comment, age, favorite, watched, watchlist, director, writers, actors, releaseDate} = filmCard;
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
        <input type="checkbox" class="film-details__control-input visually-hidden" ${watchlist ? `checked` : ``}  id="watchlist" name="watchlist">
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" ${watched ? `checked` : ``} id="watched" name="watched">
        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" ${favorite ? `checked` : ``}  id="favorite" name="favorite">
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add ${favorite ? `X` : ``}to favorites</label>
      </section>
    </div>
    ${watched ?

    `<div class="form-details__middle-container">
      <section class="film-details__user-rating-wrap">
        <div class="film-details__user-rating-controls">
          <button class="film-details__watched-reset" type="button">Undo</button>
        </div>

        <div class="film-details__user-score">
          <div class="film-details__user-rating-poster">
            <img src="./images/posters/the-great-flamarion.jpg" alt="film-poster" class="film-details__user-rating-img">
          </div>

          <section class="film-details__user-rating-inner">
            <h3 class="film-details__user-rating-title">The Great Flamarion</h3>

            <p class="film-details__user-rating-feelings">How you feel it?</p>

            <div class="film-details__user-rating-score">
              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="1" id="rating-1">
              <label class="film-details__user-rating-label" for="rating-1">1</label>

              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="2" id="rating-2">
              <label class="film-details__user-rating-label" for="rating-2">2</label>

              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="3" id="rating-3">
              <label class="film-details__user-rating-label" for="rating-3">3</label>

              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="4" id="rating-4">
              <label class="film-details__user-rating-label" for="rating-4">4</label>

              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="5" id="rating-5">
              <label class="film-details__user-rating-label" for="rating-5">5</label>

              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="6" id="rating-6">
              <label class="film-details__user-rating-label" for="rating-6">6</label>

              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="7" id="rating-7">
              <label class="film-details__user-rating-label" for="rating-7">7</label>

              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="8" id="rating-8">
              <label class="film-details__user-rating-label" for="rating-8">8</label>

              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="9" id="rating-9" checked>
              <label class="film-details__user-rating-label" for="rating-9">9</label>

            </div>
          </section>
        </div>
      </section>
    </div>`
    : ``
  }
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

          <div  class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="sleeping">
            <label class="film-details__emoji-label"  for="emoji-smile">
              <img data-emoji = "${Emoji.SMILE}" src="./images/emoji/smile.png"  width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="neutral-face">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img data-emoji = "${Emoji.SLEEPING}" src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-gpuke" value="grinning">
            <label class="film-details__emoji-label" for="emoji-gpuke">
              <img data-emoji = "${Emoji.PUKE}" src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="grinning">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img data-emoji = "${Emoji.ANGRY}" src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>
    </div>
  </form>
</section>`);
};

export default class FilmDetails extends AbstractSmartComponent {
  constructor(filmCard) {
    super();
    this._filmCard = filmCard;
    // this.checkedRatingWatchlistWatched();
    this.recoveryListeners();
  }
  getTemplate() {
    return getFilmDetailsTemplate(this._filmCard);
  }

  rerender() {
    super.rerender();
    this.setListenersEscOnButton();
    this.getEmoji();
  }

 /* checkedRatingWatchlistWatched() {
    let popupInput;
    if (this._filmCard.watched) {
      const topContainer = this.getElement().querySelector(`.form-details__top-container`);
      const rating = new FilmDetailsWithRating().getElement();
      topContainer.insertAdjacentElement(`afterend`, rating);
      popupInput= this.getElement().querySelector(`#watched`);
      popupInput.checked = true;
    }
    if (this._filmCard.watchlist) {
      popupInput = this.getElement().querySelector(`#watchlist`);
      popupInput.checked = true;
    }
    if (this._filmCard.favorite) {
      popupInput  = this.getElement().querySelector(`#favorite`);
      popupInput.checked = true;
    }

  }*/

  _onChooseEmoji(emoji) {
    const addEmoji = this.getElement().querySelector(`.film-details__add-emoji-label`);
    switch (emoji) {
      case Emoji.SMILE:
        addEmoji.innerHTML = ``;
        addEmoji.insertAdjacentHTML(`beforeend`, `<img src="./images/emoji/smile.png" width="55" height="55" alt="emoji">`);
        break;
      case Emoji.SLEEPING:
        addEmoji.innerHTML = ``;
        addEmoji.insertAdjacentHTML(`beforeend`, `<img src="./images/emoji/sleeping.png" width="55" height="55" alt="emoji">`);
        break;
      case Emoji.PUKE:
        addEmoji.innerHTML = ``;
        addEmoji.insertAdjacentHTML(`beforeend`, `<img src="./images/emoji/puke.png" width="55" height="55" alt="emoji">`);
        break;
      case Emoji.ANGRY:
        addEmoji.innerHTML = ``;
        addEmoji.insertAdjacentHTML(`beforeend`, `<img src="./images/emoji/angry.png" width="55" height="55" alt="emoji">`);
        break;
    }
  }

  getEmoji() {
    this._element.addEventListener(`click`, (evt) => {
      const emoji = evt.target.dataset.emoji;
      this._onChooseEmoji(emoji);

    });
  }

  setListenersEscOnButton() {
    const onEscKeyDown = (evt) => {
      if (evt.keyCode === 27) {
        closePopup();
      }
    };
    const closePopup = () => {
      this.getElement().remove();
      button.removeEventListener(`click`, closePopup);
      document.removeEventListener(`keydown`, onEscKeyDown);
    };
    const button = this.getElement().querySelector(`.film-details__close-btn`);
    button.addEventListener(`click`, closePopup);
    document.addEventListener(`keydown`, onEscKeyDown);
  }



  recoveryListeners() {
    const element = this.getElement();

    element.querySelector(`.film-details__control-label--watchlist`).addEventListener(`click`, () => {
        this._filmCard.watchlist = !this._filmCard.watchlist;
        this.rerender();
      });
    element.querySelector(`.film-details__control-label--watched`).addEventListener(`click`, () => {
        this._filmCard.watched = !this._filmCard.watched;
        // if(this._filmCard.watched) {
        //   const topContainer = element.querySelector(`.form-details__top-container`);
        //   const rating = new FilmDetailsWithRating().getElement();
        //   topContainer.insertAdjacentElement(`afterend`, rating);
        // }
        this.rerender();
      });
    element.querySelector(`.film-details__control-label--favorite`).addEventListener(`click`, () => {
        this._filmCard.favorite = !this._filmCard.favorite;
        this.rerender();
      });

}
}
