import { getUsername, getToken } from "../utils/auth.js";
import { getDashboardData } from "../api/dashboardApi.js";
import { getTransactions, getRecentTransactions } from "../api/transactionApi.js";
import { getCategories } from "../api/categoryApi.js";
import { getChartData } from "../api/dashboardApi.js";


let isIncome = true;
let chartInstance;
let currentDays = 7;
let currentMode = "daily";
let currentModal = null;
window.changeRange = function (days) {
    currentDays = days;
    loadChart();
};
window.setMode = function (mode, days) {
    currentMode = mode;
    currentDays = days;
    loadChart();
};
window.openDeposit = function () {
    isIncome = true;
    currentModal = "transaction";
    loadCategories();
    document.getElementById("modal-title").innerText = "Deposit";
    new bootstrap.Modal(document.getElementById('transactionModal')).show();
};

window.openWithdraw = function () {
    isIncome = false;
    currentModal = "transaction";
    loadCategories();
    document.getElementById("modal-title").innerText = "Withdraw";
    new bootstrap.Modal(document.getElementById('transactionModal')).show();
};
window.openSetBudgets = function () {
    currentModal = "budget";
    loadCategories();
    document.getElementById("modal-title").innerText = "Set Budget";
    new bootstrap.Modal(document.getElementById('BudgetModal')).show();
};
async function loadCategories() {
    const token = getToken();
    const res = await getCategories(token);

    const data = await res.json();

      let selectId;

    if (currentModal === "transaction") {
        selectId = "category";
    } else if (currentModal === "budget") {
        selectId = "budgetLimit-category";
    } else {
        return;
    }

    const select = document.getElementById(selectId);
    select.innerHTML = "";
    const filtered = currentModal === "budget"
    ? data
    :  data.filter(c => c.isIncome === isIncome);
    filtered.forEach(c => {
        const option = document.createElement("option");
        option.value = c.id;
        option.text = c.name;
        select.appendChild(option);
    });

    populateCategoryFilterMenu(data);
}

function populateCategoryFilterMenu(categories) {
    const submenu = document.getElementById("categoryFilterSubmenu");
    if (!submenu) return;

    submenu.innerHTML = "";
    const allCategoriesItem = document.createElement("li");
    allCategoriesItem.innerHTML = `
        <button class="dropdown-item" type="button" onclick="filterTransactionsByCategory(null)">All categories</button>
    `;
    submenu.appendChild(allCategoriesItem);

    categories.forEach(category => {
        const li = document.createElement("li");
        li.innerHTML = `
            <button class="dropdown-item" type="button" onclick="filterTransactionsByCategory(${category.id})">${category.name}</button>
        `;
        submenu.appendChild(li);
    });
}

window.filterTransactionsByCategory = function (categoryId) {
    loadTable(categoryId);
};

document.addEventListener("DOMContentLoaded", () => {
    loadUser();
    loadDashboard();
    loadRecent();
    loadTable();
    loadCategories();
    loadChart(); 
});
window.submitTransaction = async function () {
    const token = getToken();

    const amount = parseFloat(document.getElementById("amount").value);
    const description = document.getElementById("description").value;
    const categoryId = parseInt(document.getElementById("category").value);
    const dateValue = document.getElementById("date").value;
    
    if (!amount || !categoryId || !dateValue) {
        alert("Fill all fields");
        return;
    }

    const date = new Date(dateValue + "T00:00:00").toISOString();

    const res = await fetch("https://localhost:7095/api/transaction", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
        },
        body: JSON.stringify({
            amount,
            description,
            categoryId,
            isIncome,
            transactionDate: date
        })
    });

    if (!res.ok) {
        alert("Error creating transaction");
        return;
    }

    loadDashboard();
    loadRecent();
    loadTable();
    loadCategories();
    loadChart();
    bootstrap.Modal.getInstance(document.getElementById('transactionModal')).hide();
};
// ---------- USER ----------
function loadUser() {
    const username = getUsername();
    const el = document.getElementById("welcome-message");

    if (el && username) {
        el.innerText = `Welcome back, ${username}!`;
    }
}

// ---------- DASHBOARD ----------
async function loadDashboard() {
    const token = getToken();
    const res = await getDashboardData(token);

    if (!res.ok) return;

    const data = await res.json();

    document.getElementById("balance").innerText = data.balance.toFixed(2);
    document.getElementById("income").innerText = data.totalIncome.toFixed(2);
    document.getElementById("expenses").innerText = data.totalExpenses.toFixed(2);
}

// ---------- RECENT ----------
async function loadRecent() {
    const token = getToken();
    const res = await getRecentTransactions(token);

    if (!res.ok) return;

    const data = await res.json();

    const container = document.getElementById("recent-list");
    container.innerHTML = "";

    data.forEach(t => {
        const div = document.createElement("div");

        div.innerHTML = `
            <div class="d-flex justify-content-between">
                <div>
                    <strong>${t.description}</strong><br>
                    <small>${t.categoryName}</small>
                </div>
                <div class="${t.isIncome ? "text-success" : "text-danger"}">
                    ${t.isIncome ? "+" : "-"}$${t.amount}
                </div>
            </div>
            <hr/>
        `;

        container.appendChild(div);
    });
}

// ---------- TABLE ----------
async function loadTable(categoryId) {
    const token = getToken();
    const res = await getTransactions(token);

    if (!res.ok) return;

    const data = await res.json();

    const tbody = document.getElementById("transactions-table");
    tbody.innerHTML = "";

    const header = document.querySelector('h6');
    const isTransactionPage = header && header.textContent === 'Transactions';

    const transactions = isTransactionPage ? data : data.filter(t => !t.isIncome);
    const filteredTransactions = categoryId ? transactions.filter(t => t.categoryId === categoryId) : transactions;

    filteredTransactions.forEach(t => {
        const tr = document.createElement("tr");
            
        tr.innerHTML = `
            <td>${new Date(t.transactionDate).toLocaleDateString()}</td>
            <td>${t.categoryName}</td>
            <td class="${isTransactionPage ? (t.isIncome ? "text-success" : "text-danger") : "text-danger"}">
                ${isTransactionPage ? (t.isIncome ? "+" : "-") : "-"}$${t.amount}
            </td>
            <td>${t.description}</td>
        `;

        tbody.insertBefore(tr, tbody.firstChild);
    });
}


async function loadChart() {
    const token = getToken();
    const res = await getChartData(token, currentDays, currentMode);

    if (!res.ok) {
        console.error("Chart failed");
        return;
    }

    const data = await res.json();

    const labels = data.map(x => x.label);
    const income = data.map(x => x.income);
    const expenses = data.map(x => x.expense);
    const balance = data.map(x => x.balance);

    const ctx = document.getElementById("financeChart");


    if (chartInstance) {
        chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Income",
                    data: income,
                    borderWidth: 2,
                    tension: 0.3,
                    borderColor: "#0d6dfd63",
                    pointRadius: 0,
                   
                },
                {
                    label: "Expenses",
                    data: expenses,
                    borderWidth: 2,
                    tension: 0.3,
                    borderColor: "#dc354663",
                    pointRadius: 0,
                },
                {
                    label: "Balance",
                    data: balance,
                    borderWidth: 3,
                    tension: 0.3,
                    fill: true,

                   backgroundColor: "#28a74614",
                    borderColor: "#28a745",
                   pointRadius: 0,
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}


import { PutBudgetLimit } from "../api/dashboardApi.js";
window.submitBudgetLimit = async function () {
    const token = getToken();

    const amount = parseFloat(document.getElementById("limit-amount").value);
    const categoryId = parseInt(document.getElementById("budgetLimit-category").value);
    
    if (!amount || !categoryId) {
        alert("Fill all fields");
        return;
    }

    const res = await PutBudgetLimit(token, { amount, categoryId });

    if (!res.ok) {
        alert("Error creating transaction");
        return;
    }

    loadDashboard();
    loadRecent();
    loadTable();
    loadCategories();
    loadChart();
    bootstrap.Modal.getInstance(document.getElementById('BudgetModal')).hide();
};