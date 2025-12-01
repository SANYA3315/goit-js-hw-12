import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery, PER_PAGE } from './js/2-pixabay-api.js';
import {
    clearGallery,
    createGallery,
    showLoader,
    hideLoader,
    showLoadMoreButton,
    hideLoadMoreButton,
    loadMoreBtnRef,
    galleryRef,
} from './js/1-gallery.js';

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
function notifySuccess(message) {
    iziToast.success({ title: '', message, position: 'topRight' });
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


    if (query !== currentQuery) {
        currentQuery = query;
        page = 1;
        totalHits = 0;
        clearGallery();
        hideLoadMoreButton();
    }

    await fetchAndRender();
    form.reset();
}

async function onLoadMore() {
    await fetchAndRender();
}

async function fetchAndRender() {
    try {
        showLoader();

        const data = await getImagesByQuery(currentQuery, page);
        if (!data || !Array.isArray(data.hits)) {
            notifyError('Немає відповіді від сервера.');
            return;
        }

        const { hits, totalHits: total } = data;


        if (page === 1 && hits.length === 0) {
            hideLoadMoreButton();
            notifyInfo(
                'Sorry, there are no images matching your search query. Please try again!'
            );
            return;
        }


        createGallery(hits);


        totalHits = total;


        const imagesAlreadyShown = (page - 1) * PER_PAGE + hits.length;

        if (imagesAlreadyShown < totalHits) {
            showLoadMoreButton();
        } else {
            hideLoadMoreButton();
            notifyInfo("We're sorry, but you've reached the end of search results.");
        }


        if (page > 1) {
            smoothScrollAfterLoad();
        }

        page += 1;
    } catch (error) {
        notifyError('Something went wrong. Please try again later.');
        console.error(error);
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
