// import './css/styles.css';
// import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImages } from './fetchImages';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const searchInput = document.querySelector('#search-form');
const imageList = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
let page = 1;
let inputValue = '';

searchInput.addEventListener('submit', searchImages);

// fetchImages().then(resp => console.log(resp));

function searchImages(e) {
  e.preventDefault();
  inputValue = e.currentTarget.elements.searchQuery.value.trim();
  if (inputValue) {
    page = 1;
    fetchImages(inputValue, page)
      .then(setMarkup)
      .catch(err => {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        console.log(err);
      });
  }
  imageList.innerHTML = '';
}

function createMarkup(arr) {
  console.log(arr);
  return arr.reduce(
    (
      acc,
      { webformatURL, largeImageURL, tags, likes, views, comments, downloads }
    ) =>
      acc +
      ` <div class="photo-card"><a class="gallery__item" href="${largeImageURL}">
    <img
      class="gallery__image"
      src="${webformatURL}"
        data-source="${largeImageURL}"                      
      alt="${tags}" loading="lazy" width="300"/>
      </a>
      <div class="info">
        <p class="info-item">
          <b>Likes: </b>${likes}
        </p>
        <p class="info-item">
          <b>Views: </b>${views}
        </p>
        <p class="info-item">
          <b>Comments: </b>${comments}
        </p>
        <p class="info-item">
          <b>Downloads: </b>${downloads}
        </p>
      </div>
    </div> `,
    ''
  );
}

function setMarkup(response) {
  if (response.data.hits.length === 0) {
    loadMoreBtn.setAttribute('hidden', 'true');
    throw new Error();
  }
  loadMoreBtn.removeAttribute('hidden');
  imageList.insertAdjacentHTML('beforeend', createMarkup(response.data.hits));
  let count = Math.floor(response.data.totalHits / response.data.hits.length);
  if (count === page && page > 1) {
    loadMoreBtn.setAttribute('hidden', 'true');
    Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
  }
  if (count === page) {
    loadMoreBtn.setAttribute('hidden', 'true');
  }
}

loadMoreBtn.addEventListener('click', handlerLoadMore);

function handlerLoadMore(e) {
  e.preventDefault();
  page += 1;
  fetchImages(inputValue, page).then(setMarkup);
}
