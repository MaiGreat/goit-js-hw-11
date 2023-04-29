import { fetchGalleryImgs } from './fetchImgs'
import Notiflix from 'notiflix';

const formEl = document.querySelector('#search-form');
const divEl = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');
// console.log(btnLoadMore);

formEl.addEventListener('submit', onSubmit);
btnLoadMore.addEventListener('click', onClick)

let page = 1;
let inputTextToSearch = '';

function onSubmit(e) {
  e.preventDefault();
  inputTextToSearch = e.currentTarget.elements.searchQuery.value.trim();
  console.log(inputTextToSearch);
  if (inputTextToSearch === '') {
    return;
  }
  page = 1;
  fetchGalleryImgs(inputTextToSearch, page).then(arrayDate => {
    console.log(arrayDate);
    divEl.innerHTML = '';
    if (arrayDate.hits.length === 0) {
      throw Error('Sorry, there are no images matching your search query. Please try again.');
    }
    markupGallery(arrayDate.hits);
  })
    .catch(error => {
      Notiflix.Notify.failure(error.message);
    });
}


function onClick(e) {
  page += 1;
  fetchGalleryImgs(inputTextToSearch, page).then(arrayDate => {
    console.log(arrayDate);
    markupGallery(arrayDate.hits);
  })
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
</div>
  `
  })
    .join(' ');
  
  divEl.insertAdjacentHTML('beforeend', markup);
}