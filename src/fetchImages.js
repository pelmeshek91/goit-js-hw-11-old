import axios from 'axios';

export async function fetchImages(image, page) {
  const BASE_URL = 'https://pixabay.com/api/';
  const KEY = '29876171-467d2b4c1ee85715865faf87a';

  const filtersImages =
    '&per_page=40&image_type=photo&orientation=horizontal&safesearch=true';

  const data = await axios(
    `${BASE_URL}?key=${KEY}&q=${image}&page=${page}${filtersImages}`
  );

  return data;
}
