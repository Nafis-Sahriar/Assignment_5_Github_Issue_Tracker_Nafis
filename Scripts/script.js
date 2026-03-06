// console.log("Script js Running");

const btnAll = document.getElementById("btn-all");
const btnOpen = document.getElementById("btn-open");
const btnClosed = document.getElementById("btn-closed");

const issuesALl = [];
const issuesOpen = [];
const issuesClosed = [];

function toggleButton(id) {
  btnAll.classList.remove("btn-primary");
  btnOpen.classList.remove("btn-primary");
  btnClosed.classList.remove("btn-primary");

  const clicked = document.getElementById(id);

  clicked.classList.add("btn-primary");
}

// Toggle button Funtion
function toggle(id) {
  toggleButton(id);

  if (id === "btn-all") {
    getCards("btn-all");
  } else if (id === "btn-open") {
    getCards("btn-open");
  } else if (id === "btn-closed") {
    getCards("btn-closed");
  }
}

// Fetch and get all section Cards
// Bismillahir Rahmanir Rahim.

async function getCards(clickedBtn) {
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

  const res = await fetch(url);

  const issues = await res.json();

  countIssues(issues.data);

  if (clickedBtn === "btn-all") {
    loadIssues(issues.data);
    renderAllCounter();

    console.log(issuesALl.length);
  } else if (clickedBtn === "btn-open") {
    loadIssuesOpen(issues.data);
    renderOpenCounter();

    console.log(issuesOpen.length);
  } else if (clickedBtn === "btn-closed") {
    loadIssuesClosed(issues.data);
    renderClosedCounter();

    console.log(issuesClosed.length);
  }
}

function loadOpen(issue, icContainer) {
  const container = icContainer;

  const ic = document.createElement("div");

  ic.innerHTML = `


    <div onclick="my_modal_1.showModal()" id="ic-crd-open" class="p-5 bg-base-100 border-t-5 border-t-green-500 shadow-md rounded-xl  hover:shadow-lg hover:shadow-green-200 transition ">

                <!-- Logo ar priority tag er div -->
                <div class="flex justify-between items-center mb-3">

                    <div class="flex items-center gap-3">
                        <img class="w-9 h-9 rounded-full object-cover" src="./assets/Open-Status.png" alt="">
                        <span class="text-sm font-medium text-gray-500">Open</span>
                    </div>

                    <p class="font-semibold bg-red-100 text-red-600 px-3 py-1 rounded-full">${issue.priority}</p>

                </div>

                <!-- Title + Description | Eta dynamically load hobe API Theke -->
                <div class="mb-7">
                    <h1 class="font-semibold text-2xl mb-3">
                        ${issue.title}
                    </h1>

                    <p class="text-sm text-gray-500 line-clamp-2">
                        ${issue.description}
                    </p>
                </div>

                <!-- Tag | Dynamically Load Hobe API theke -->
                <div class="flex flex-wrap gap-2 mb-4 label-div">

                   

                </div>

                <hr class="mb-3">

                <!-- By WHom and date div-->
                <div class="flex flex-col gap-5 text-sm text-gray-500">

                    <p># by <span class="font-medium text-gray-700">${issue.author}</span></p>
                    <p>Created At - ${issue.createdAt}</p>
                    <p>Updated At - ${issue.updatedAt}</p>


                </div>

            </div>
    `;

  container.append(ic);

  const labelContainer = ic.querySelector(".label-div");

  const labelsArr = issue.labels;

  for (label of labelsArr) {
    const labelButton = document.createElement("button");

    labelButton.innerHTML = `
        
          <button class="text-xs px-3 py-1 bg-yellow-100 border border-yellow-400 text-yellow-800 rounded-full">${label}</button>

        `;
    labelContainer.append(labelButton);
  }
}

function loadClosed(issue, icContainer) {
  const container = icContainer;

  const ic = document.createElement("div");

  ic.innerHTML = `

     <div onclick="my_modal_1.showModal()" id="ic-crd-closed" class="p-5 bg-base-100 border-t-5 border-t-purple-500 shadow-md rounded-xl hover:shadow-lg hover:shadow-purple-200 transition ">

                <!-- Logo ar priority tag er div -->
                <div class="flex justify-between items-center mb-3">

                    <div class="flex items-center gap-3">
                        <img class="w-9 h-9 rounded-full object-cover" src="./assets/Closed- Status .png" alt="">
                        <span class="text-sm font-medium text-gray-500">Closed</span>
                    </div>

                    <p class="font-semibold bg-red-100 text-red-600 px-3 py-1 rounded-full">${issue.priority}</p>

                </div>

                <!-- Title + Description | Eta dynamically load hobe API Theke -->
                <div class="mb-7">
                    <h1 class="font-semibold text-2xl mb-3">
                        ${issue.title}
                    </h1>

                    <p class="text-sm text-gray-500 line-clamp-2">
                        ${issue.description}
                    </p>
                </div>

                <!-- Tag | Dynamically Load Hobe API theke -->
                <div class="flex flex-wrap gap-2 mb-4 label-div">

                    



                </div>

                <hr class="mb-3">

                <!-- By WHom and date div-->
                <div class="flex flex-col gap-5 text-sm text-gray-500">

                    <p># by <span class="font-medium text-gray-700">${issue.author}</span></p>
                    <p>Created At - ${issue.createdAt}</p>
                    <p>Updated At - ${issue.updatedAt}</p>


                </div>

            </div>
    `;

  container.append(ic);

  const labelContainer = ic.querySelector(".label-div");

  const labelsArr = issue.labels;

  for (label of labelsArr) {
    const labelButton = document.createElement("button");

    labelButton.innerHTML = `
        
          <button class="text-xs px-3 py-1 bg-yellow-100 border border-yellow-400 text-yellow-800 rounded-full">${label}</button>

        `;
    labelContainer.append(labelButton);
  }
}

function loadIssues(issues) {
  const issueContainer = document.getElementById("ic-container");
  issueContainer.innerHTML = "";

  for (let issue of issues) {
    if (issue.status === "open") {
      loadOpen(issue, issueContainer);
    } else if (issue.status === "closed") {
      loadClosed(issue, issueContainer);
    }
  }
}

function loadIssuesOpen(issues) {
  const issueContainer = document.getElementById("ic-container");
  issueContainer.innerHTML = "";

  for (let issue of issues) {
    if (issue.status === "open") {
      loadOpen(issue, issueContainer);
    }
  }
}

function loadIssuesClosed(issues) {
  const issueContainer = document.getElementById("ic-container");
  issueContainer.innerHTML = "";

  for (let issue of issues) {
    if (issue.status === "closed") {
      loadClosed(issue, issueContainer);
    }
  }
}

getCards("btn-all");

function countIssues(issues) {
  issues.forEach((element) => {
    const issue = {
      issueID: element.id,
      issueTitle: element.title,
      issueDescription: element.description,
      issueStatus: element.status,
      issueLabels: element.labels,
      issuePriority: element.priority,
      issueAuthor: element.author,
    };

    if (!issuesALl.find((item) => item.issueID === issue.issueID)) {
      issuesALl.push(issue);
    }

    if (issue.issueStatus === "open") {
      if (!issuesOpen.find((item) => item.issueID === issue.issueID)) {
        issuesOpen.push(issue);
      }
    } else if (issue.issueStatus === "closed") {
      if (!issuesClosed.find((item) => item.issueID === issue.issueID)) {
        issuesClosed.push(issue);
      }
    }
  });
}

function renderAllCounter() {
  const AllCounter = document.getElementById("issue-num");
  AllCounter.innerText = issuesALl.length;
}

function renderOpenCounter() {
  const AllCounter = document.getElementById("issue-num");
  AllCounter.innerText = issuesOpen.length;
}

function renderClosedCounter() {
  const AllCounter = document.getElementById("issue-num");
  AllCounter.innerText = issuesClosed.length;
}
