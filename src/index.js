import './css/styles.css';
import * as debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');

const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener('input', debounce(requestCountry, DEBOUNCE_DELAY));

function requestCountry(e) {
  const inputValue = e.target.value.trim();

  if (inputValue) {
    fetchCountries(inputValue)
      .then(setMarkup)
      .catch(err => Notify.failure('Oops, there is no country with that name'));
  } else {
    countryList.innerHTML = '';
  }
}

function createMarkup(arr) {
  return arr.reduce(
    (acc, { name, flag }) =>
      acc +
      `<li class="list-item"><img src="${flag}" style="width:30px;height:30px;"><p>${name}</p></li>`,
    ''
  );
}

function createCountry({ flag, name, capital, population, languages }) {
  return `<div class="wrap"><img src="${flag}" style="width:40px;height:40px;"><h1>${name}</h1></div><p>Capital: <span>${capital}</span></p><p>Population: <span>${population}</span></p><p>Languages: <span>${languages
    .map(language => language.name)
    .join(', ')}</span></p>`;
}
function setMarkup(countries) {
  if (countries.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');

    return;
  }
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
  if (countries.length === 1) {
    countryInfo.innerHTML = createCountry(countries[0]);
    return;
  }

  countryList.insertAdjacentHTML('beforeend', createMarkup(countries));
}
