import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
    gallery: document.querySelector('.js-gallery'),
    loader: document.getElementById('loader'),
    loadMoreBtn: document.getElementById('load-more'),
};

const lightbox = new SimpleLightbox('.js-gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
});


function createCard({
    webformatURL,
    largeImageURL,
    tags,
    likes,
    views,
    comments,
    downloads,
}) {
    return `<li class="gallery-item">
    <a href="${largeImageURL}" class="gallery-link">
      <img src="${webformatURL}" alt="${tags}" loading="lazy" />
    </a>
    <div class="gallery-descr">
      <div class="gallery-descr-item">
        <p class="gallery-descr-title">Likes</p>
        <p class="gallery-descr-value">${likes}</p>
      </div>
      <div class="gallery-descr-item">
        <p class="gallery-descr-title">Views</p>
        <p class="gallery-descr-value">${views}</p>
      </div>
      <div class="gallery-descr-item">
        <p class="gallery-descr-title">Comments</p>
        <p class="gallery-descr-value">${comments}</p>
      </div>
      <div class="gallery-descr-item">
        <p class="gallery-descr-title">Downloads</p>
        <p class="gallery-descr-value">${downloads}</p>
      </div>
    </div>
  </li>`;
}

export function createGallery(images) {
    if (!Array.isArray(images) || images.length === 0) return;
    const markup = images.map(createCard).join('');
    refs.gallery.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();
}


export function clearGallery() {
    refs.gallery.innerHTML = '';
    lightbox.refresh();
}


export function showLoader() {
    refs.loader.classList.remove('is-hidden');
}
export function hideLoader() {
    refs.loader.classList.add('is-hidden');
}

export function showLoadMoreButton() {
    refs.loadMoreBtn.classList.remove('is-hidden');
}
export function hideLoadMoreButton() {
    refs.loadMoreBtn.classList.add('is-hidden');
}


export const galleryRef = refs.gallery;
export const loadMoreBtnRef = refs.loadMoreBtn;
