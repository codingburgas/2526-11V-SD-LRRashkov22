
import { getBudgetData } from "../api/analyticsApi.js";
import { getToken } from "../utils/auth.js";
import { getCategories } from "../api/categoryApi.js";
async function LoadAnalytics() {
const token = getToken();
const res = await getBudgetData(token);
if (!res.ok) {
    console.log("Request failed", res.status);
    return;
}

const data = await res.json();
console.log(data);
let budgets = data;

const tbody = document.getElementById("analytics-table-body");
tbody.innerHTML = "";
budgets.forEach(b => 
{
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${b.categoryName}</td>
        <td>
            ${b.budgetAmount ? `$${b.budgetAmount}` : "No budget set"}
        </td>
        <td>${b.spentAmount}</td>
        <td>${b.remainingAmount}</td>
        <td>
            ${b.percentageUsed}%
        </td>
    `;
    tbody.appendChild(tr);
}
)
}

document.addEventListener("DOMContentLoaded", () => {
    LoadAnalytics();
});