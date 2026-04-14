const API_URL = "https://localhost:7095/api/dashboard";

export async function getDashboardData(token) {
    return fetch(API_URL, {
        headers: {
            Authorization: "Bearer " + token
        }
    });
}
import { getCategories } from "../api/categoryApi.js";

async function loadCategories() {
    const token = getToken();
    const res = await getCategories(token);

    const data = await res.json();

    const select = document.getElementById("category");

    data.forEach(c => {
        const option = document.createElement("option");
        option.value = c.id;
        option.text = c.name;
        select.appendChild(option);
    });
}

export async function getChartData(token, days, mode) {
    return fetch(`https://localhost:7095/api/dashboard/chart?days=${days}&mode=${mode}`, {
        headers: {
            Authorization: "Bearer " + token
        }
    });
}