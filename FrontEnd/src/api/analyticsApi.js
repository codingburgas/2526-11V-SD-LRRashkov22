const BASE_URL = "https://localhost:7095/api/Analytics";

export async function getBudgetData(token) {
    return fetch(`${BASE_URL}/budget`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
}