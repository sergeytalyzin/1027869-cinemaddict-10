import {getRandomNumber} from "../mock/card";
const numberMovies = getRandomNumber(1, 1000);

const getFilterStatistic = (filter, isChecked) => {
  const {name} = filter;
  return (`<input type="radio" class="statistic__filters-input visually-hidden" 
        name="statistic-filter" 
        id="statistic-${name.toLowerCase()}" 
        value="all-time" 
        ${isChecked ? `checked` : ``}>
      <label for="statistic-${name.toLowerCase()}" class="statistic__filters-label">${name}</label>`);
};

export const getStatisticTemplate = (filters) => {


  const filterStatistic = filters.map((filter, i) => getFilterStatistic(filter, i === 0)).join(`\n`);


  return (`<section class="statistic">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">Sci-Fighter</span>
    </p>

    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>
      ${filterStatistic} 
      </form>

    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${numberMovies}<span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">130 <span class="statistic__item-description">h</span> 22 <span class="statistic__item-description">m</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">Sci-Fi</p>
      </li>
    </ul>

    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>

  </section>`);
};
