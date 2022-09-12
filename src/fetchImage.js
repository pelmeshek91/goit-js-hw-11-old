export async function fetchImages(image, page) {
  const BASE_URL = 'https://pixabay.com/api/';
  const KEY = '29876171-467d2b4c1ee85715865faf87a';

  const filtersImages =
    '&per_page=40&image_type=photo&orientation=horizontal&safesearch=true';

  const data = await fetch(
    `${BASE_URL}?key=${KEY}&q=${image}&page=${page}${filtersImages}`
  );
  console.log(data);
  if (!data.ok) {
    throw new Error(data.status);
  }
  return await data.json();
}
