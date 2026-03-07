

const loginBtn = document.getElementById("loginBtn");
const issuesAllCard = document.getElementById("issuesAllCard");
const count = document.getElementById("count");

let allIssues = [];

// Login System
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

// Load Issues
async function loadIssues() {
    const res = await fetch(
        "https://phi-lab-server.vercel.app/api/v1/lab/issues"
    );

    const data = await res.json();

    allIssues = data.data;

    displayIssues(allIssues);
}



// Display Cards
function displayIssues(issues) {

    issuesAllCard.innerHTML = "";

    count.innerText = issues.length;

    issues.forEach((issue) => {

        // Status Border
        let borderColor = "border-green-500";

        if (issue.status === "closed") {
            borderColor = "border-purple-500";
        }

        // Priority Color
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


        // Labels Map
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

    <h3 class="font-bold text-lg mt-2">
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
loadIssues();
