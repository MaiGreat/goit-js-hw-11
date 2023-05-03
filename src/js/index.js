import { FetchGalleryClass } from './fetchGalleryClass.js';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const fetchGalleryExamp = new FetchGalleryClass();


const formEl = document.querySelector('#search-form');
const divEl = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');


formEl.addEventListener('submit', onSubmit);
btnLoadMore.addEventListener('click', onClick)

const simpleLightBox = new SimpleLightbox('.gallery a');

function onSubmit(e) {
  e.preventDefault();
  fetchGalleryExamp.propertyUserRequest  = e.currentTarget.elements.searchQuery.value.trim();
  if (fetchGalleryExamp.propertyUserRequest  === '') {
    return;
  }
  fetchGalleryExamp.propertyPage = 1;
  fetchGalleryExamp.fetchGalleryImgs().then(arrayDate => {
    // console.log(arrayDate);
    divEl.innerHTML = '';
    if (arrayDate.hits.length === 0) {
      throw Error('Sorry, there are no images matching your search query. Please try again.');
    }
    Notiflix.Notify.success(`Hooray! We found ${arrayDate.totalHits} images.`)
    markupGallery(arrayDate.hits);
    showBtn();
    simpleLightBox.refresh();
    hideBtnIfNeed(arrayDate);
  })
    .catch(error => {
      Notiflix.Notify.failure(error.message);
    });
}


function onClick(e) {
  fetchGalleryExamp.propertyPage += 1;
  fetchGalleryExamp.fetchGalleryImgs().then(arrayDate => {
    markupGallery(arrayDate.hits);
    simpleLightBox.refresh();
    hideBtnIfNeed(arrayDate);
  })
}

function showBtn() {
  btnLoadMore.classList.remove('is-hidden');
}

function hiddenBtn() {
  btnLoadMore.classList.add('is-hidden');
}

function hideBtnIfNeed(arrayDate) {
      if (arrayDate.totalHits === divEl.children.length) {
        hiddenBtn();
         Notiflix.Notify.info("We're sorry, but you've reached the end of search results.")
    }
}

function markupGallery(images) {
  const markup = images.map(({
    largeImageURL,
    webformatURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  }) => {
    return `
<div class="photo-card">
  <a class="gallery-link" href="${largeImageURL}">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" width = "300" height = "200" />
    <div class="info">
      <p class="info-item">
        <b>Likes ${likes}</b>
      </p>
      <p class="info-item">
        <b>Views ${views}</b>
      </p>
      <p class="info-item">
        <b>Comments ${comments}</b>
      </p>
      <p class="info-item">
        <b>Downloads ${downloads}</b>
      </p>
    </div>
  </a>
</div>
  `
  })
    .join(' ');
  
  divEl.insertAdjacentHTML('beforeend', markup);
}