// api/categoryApi.js
const BASE_URL = "https://localhost:7095/api/categories";

export async function getCategories(token) {
    return fetch(BASE_URL, {
        headers: {
            Authorization: "Bearer " + token
        }
    });
}