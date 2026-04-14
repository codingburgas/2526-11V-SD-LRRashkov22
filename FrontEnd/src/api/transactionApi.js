const BASE_URL = "https://localhost:7095/api/transaction";

export async function getTransactions(token) {
    return fetch(BASE_URL, {
        headers: {
            Authorization: "Bearer " + token
        }
    });
}

export async function getRecentTransactions(token) {
    return fetch(`${BASE_URL}/recent`, {
        headers: {
            Authorization: "Bearer " + token
        }
    });
}