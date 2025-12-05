import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery, PER_PAGE } from './js/pixabay-api.js';
import {
    clearGallery,
    createGallery,
    showLoader,
    hideLoader,
    showLoadMoreButton,
    hideLoadMoreButton,
    loadMoreBtnRef,
    galleryRef,
} from './js/render-functions.js';

const form = document.getElementById('search-form');
const input = form.querySelector('input[name="search-text"]');

let currentQuery = '';
let page = 1;
let totalHits = 0;

form.addEventListener('submit', onSearch);
loadMoreBtnRef.addEventListener('click', onLoadMore);

function notifyInfo(message) {
    iziToast.info({ title: '', message, position: 'topRight' });
}
function notifyError(message) {
    iziToast.error({ title: 'Error', message, position: 'topRight' });
}

async function onSearch(e) {
    e.preventDefault();
    const query = input.value.trim();

    if (!query) {
        notifyInfo('Please enter a search query.');
        return;
    }

    currentQuery = query;
    page = 1;
    totalHits = 0;

    clearGallery();
    hideLoadMoreButton();

    await fetchAndRender(false);

    form.reset();
}

async function onLoadMore() {
    page += 1;
    await fetchAndRender(true);
}

async function fetchAndRender(isLoadMore) {
    try {
        showLoader();

        const data = await getImagesByQuery(currentQuery, page);

        if (!data || !Array.isArray(data.hits)) {
            notifyError('No server response.');
            return;
        }

        const { hits, totalHits: total } = data;

        if (page === 1 && hits.length === 0) {
            hideLoadMoreButton();
            notifyInfo('Sorry, there are no images matching your search query. Please try again!');
            return;
        }

        if (hits.length > 0) {
            createGallery(hits);
        }

        totalHits = total;

        const shown = galleryRef.querySelectorAll('.gallery-item').length;

        if (shown < totalHits) {
            showLoadMoreButton();
        } else {
            hideLoadMoreButton();
            notifyInfo("We're sorry, but you've reached the end of search results.");
        }

        if (isLoadMore && hits.length > 0) {
            smoothScrollAfterLoad();
        }
    } catch (error) {
        notifyError('Something went wrong. Please try again later.');
    } finally {
        hideLoader();
    }
}

function smoothScrollAfterLoad() {
    const firstCard = galleryRef.querySelector('.gallery-item');
    if (!firstCard) return;
    const { height } = firstCard.getBoundingClientRect();
    window.scrollBy({
        top: height * 2,
        behavior: 'smooth',
    });
}
