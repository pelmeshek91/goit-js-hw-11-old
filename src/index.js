import './css/styles.css';

import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImages } from './fetchImage';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const searchInput = document.querySelector('#search-form');
const imageList = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
let page = 1;
let inputValue = '';

searchInput.addEventListener('submit', searchImages);

fetchImages().then(resp => console.log(resp));

function searchImages(e) {
  e.preventDefault();
  inputValue = e.currentTarget.elements.searchQuery.value.trim();

  if (inputValue) {
    fetchImages(inputValue, page)
      .then(setMarkup)
      .catch(err => {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      });
  }
  imageList.innerHTML = '';
}

function createMarkup(arr) {
  return arr.reduce(
    (
      acc,
      { webformatURL, largeImageURL, tags, likes, views, comments, downloads }
    ) =>
      acc +
      ` <a class="gallery__item" href="${largeImageURL}">
    <img
      class="gallery__image"
      src="${webformatURL}"
        data-source="${largeImageURL}"                      
      alt="${tags}" loading="lazy"/>
      <div class="photo-card">
      <div class="info">
        <p class="info-item">
          <b>Likes</b>${likes}
        </p>
        <p class="info-item">
          <b>Views</b>${views}
        </p>
        <p class="info-item">
          <b>Comments</b>${comments}
        </p>
        <p class="info-item">
          <b>Downloads</b>${downloads}
        </p>
      </div>
    </div>
       </a>`,
    ''
  );
}

function setMarkup(response) {
  imageList.insertAdjacentHTML('beforeend', createMarkup(response.hits));
  loadMoreBtn.removeAttribute('hidden');
}

loadMoreBtn.addEventListener('click', handlerLoadMore);

function handlerLoadMore(e) {
  e.preventDefault();
  page += 1;
  fetchImages(inputValue, page).then(response => {
    imageList.insertAdjacentHTML('beforeend', createMarkup(response.hits));
    loadMoreBtn.setAttribute('hidden', false);
  });
}
