import axios from 'axios';

const API_KEY = '53367958-e4d72e9b7abbbffbba381cf2e';
const BASE_URL = 'https://pixabay.com/api/';
export const PER_PAGE = 15;

const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
});

export async function getImagesByQuery(query, page = 1) {
    try {
        const response = await instance.get('/', {
            params: {
                key: API_KEY,
                q: query,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
                per_page: PER_PAGE,
                page,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}
