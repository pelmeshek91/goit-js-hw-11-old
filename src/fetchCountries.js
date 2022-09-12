export function fetchCountries(country) {
  const BASE_URL = 'https://restcountries.com/v2/name/';
  const filtersCountries = '?fields=flag,capital,name,population,languages';
  return fetch(`${BASE_URL}${country}${filtersCountries}`).then(data => {
    if (!data.ok) {
      throw new Error(data.status);
    }
    return data.json();
  });
}
