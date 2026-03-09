

const loginBtn = document.getElementById("loginBtn");
const issuesAllCard = document.getElementById("issuesAllCard");
const count = document.getElementById("count");
const loadingSpinner = document.getElementById("loadingSpinner");

const issueModal = document.getElementById("cardModal");

const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalStatus = document.getElementById("modalStatus");
const modalAuthor = document.getElementById("modalAuthor");
const modalDate = document.getElementById("modalDate");
const modalAssignee = document.getElementById("modalAssignee");
const modalPriority = document.getElementById("modalPriority");
const modalLabels = document.getElementById("modalLabels");

let allIssues = [];


if (loginBtn) {
    loginBtn.addEventListener("click", function () {
        const userName = document.getElementById("inputUsername").value;
        const pin = document.getElementById("inputPin").value;

        if (userName === "admin" && pin === "123") {
            alert("Login Success");
            window.location.href = "home.html";
        } else {
            alert("Login Failed");
        }
    });
}

function showLoading() {
    loadingSpinner.classList.remove("hidden");
    issuesAllCard.innerHTML = "";
}
function hideLoading() {
    loadingSpinner.classList.add("hidden");
}


async function loadIssues() {
    showLoading();
    const res = await fetch(
        "https://phi-lab-server.vercel.app/api/v1/lab/issues"
    );

    const data = await res.json();
    hideLoading();
    allIssues = data.data;

    displayIssues(allIssues);
}


async function searchBar() {

    const item = document
        .getElementById("searchInput")
        .value;

    const res = await fetch(
        `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${item}`
    );

    const data = await res.json();

    displayIssues(data.data);

}




function displayIssues(issues) {

    issuesAllCard.innerHTML = "";

    count.innerText = issues.length;

    issues.forEach((issue) => {


        let borderColor = "border-green-500";

        if (issue.status === "closed") {
            borderColor = "border-purple-500";
        }


        let priorityColor = "bg-blue-500";

        if (issue.priority === "high") {
            priorityColor = "bg-red-200 text-red-600";
        }
        else if (issue.priority === "medium") {
            priorityColor = "bg-yellow-200 text-yellow-600";
        }
        else if (issue.priority === "low") {
            priorityColor = "bg-gray-200 text-gray-500";
        }

        let statusImage = "./assets/Open-Status.png";

        if (issue.status === "closed") {
            statusImage = "./assets/Closed- Status .png";
        }



        const labelsHtml = issue.labels
            .map((label, index) => {

                let colorClass = "border-red-300 text-red-500";

                if (index === 1) {
                    colorClass = "border-yellow-400 text-yellow-600";
                }

                return `
        <button class="flex items-center gap-1 border ${colorClass} px-3 py-1 rounded-full text-xs">
          ${label.toUpperCase()}
        </button>
        `;
            })
            .join("");



        const infoArray = [
            `Status: ${issue.status}`,
            `Priority: ${issue.priority}`,
            `Author: ${issue.author}`
        ];

        const infoHtml = infoArray
            .map((item) => `<p>${item}</p>`)
            .join("");


        const card = document.createElement("div");

        card.className = `bg-white p-4 rounded shadow border-t-4 ${borderColor}`;

        card.innerHTML = `

    <div class="flex justify-between items-center">

      <img src="${statusImage}" class="w-6 h-6"/>

      <button class="${priorityColor} px-3 py-1 rounded-full text-xs font-semibold">
        ${issue.priority.toUpperCase()}
      </button>

    </div>

   <h3 class="font-bold text-lg mt-2 cursor-pointer"
onclick="openIssueModal(${issue.id})">
${issue.title}
</h3>

    <p class="text-sm text-gray-500 mt-2">
      ${issue.description}
    </p>

    <div class="flex gap-2 mt-3">
      ${labelsHtml}
    </div>

    <div class="text-sm mt-3">
      ${infoHtml}
    </div>

    <p class="text-xs mt-2 text-gray-400">
      ${issue.createdAt}
    </p>

    `;

        issuesAllCard.appendChild(card);

    });

}


function filterIssues(color) {

    activeButton(color);

    if (color === "all") {
        displayIssues(allIssues);
    }

    else if (color === "open") {

        const filtered = allIssues.filter(
            (issue) => issue.status === "open"
        );

        displayIssues(filtered);
    }

    else if (color === "closed") {

        const filtered = allIssues.filter(
            (issue) => issue.status === "closed"
        );

        displayIssues(filtered);
    }
}



function activeButton(color) {

    const buttons = document.querySelectorAll(".tabBtn");

    buttons.forEach((btn) => {
        btn.classList.remove("bg-blue-600", "text-white");
        btn.classList.add("bg-gray-200");
    });

    if (color === "all") {
        const btn = document.getElementById("allBtn");

        btn.classList.remove("bg-gray-200");
        btn.classList.add("bg-blue-600", "text-white");
    }

    if (color === "open") {
        const btn = document.getElementById("openBtn");

        btn.classList.remove("bg-gray-200");
        btn.classList.add("bg-blue-600", "text-white");
    }

    if (color === "closed") {
        const btn = document.getElementById("closedBtn");

        btn.classList.remove("bg-gray-200");
        btn.classList.add("bg-blue-600", "text-white");
    }
}

async function openIssueModal(id) {

    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);

    const data = await res.json();

    const items = data.data;

    modalTitle.innerText = items.title;

    modalDescription.innerText = items.description;

    modalStatus.innerText = items.status.toUpperCase();

    modalAuthor.innerText = items.author;

    modalDate.innerText = items.createdAt;

    modalAssignee.innerText = items.assignee;

    modalPriority.innerText = items.priority.toUpperCase();

    modalLabels.innerHTML = items.labels
        .map(label => `
<span class="border border-red-300 text-red-500 px-3 py-1 rounded-full text-xs">
${label.toUpperCase()}
</span>
`).join("");

    issueModal.showModal();

}


loadIssues();