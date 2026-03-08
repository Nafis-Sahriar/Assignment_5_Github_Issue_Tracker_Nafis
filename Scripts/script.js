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
function toggle(id) 
{
  toggleButton(id);

  if (id === "btn-all") 
  {
    getCards("btn-all");  // Getting the cards | load the cards | issue data array | store dynamically | append
  } 
  else if (id === "btn-open") 
  {
    getCards("btn-open"); // Getting the cards | load the cards | issue data array | store dynamically | append
  } 
  else if (id === "btn-closed") 
  {
    getCards("btn-closed");
  }
}

// Fetch and get all section Cards
// Bismillahir Rahmanir Rahim.

async function getCards(clickedBtn) 
{
  loading_icon(true);

  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

  const res = await fetch(url);

  const issues = await res.json();

  countIssues(issues.data);

  if (clickedBtn === "btn-all") 
    {
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

  loading_icon(false);
}

function loadOpen(issue, icContainer) 
{
  const container = icContainer;

  const ic = document.createElement("div");

  ic.innerHTML = `


    <div onclick="loadModal('${issue.id}')" id="ic-crd-open" class="p-5 bg-base-100 border-t-5 border-t-green-500 shadow-md rounded-xl  hover:shadow-xl hover:shadow-green-300 transition ">

                <!-- Logo ar priority tag er div -->
                <div class="flex justify-between items-center mb-3">

                    <div class="flex items-center gap-3">
                        <img class="w-9 h-9 rounded-full object-cover" src="./assets/Open-Status.png" alt="">
                        <span class="text-sm font-medium text-gray-500">Open</span>
                    </div>

                    <div class="priority-card">
                       
                    </div>

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

    if(label==='bug')
    {
        console.log(label);
           labelButton.innerHTML = `
        
          <button class="text-xs px-3 py-1 bg-red-100 border border-red-400 text-red-600 rounded-full font-bold"> <i class="fa-solid fa-bug"></i> ${label}</button>

        `;
    labelContainer.append(labelButton);
    }

    else if(label==='documentation')
    {

        console.log(label);
           labelButton.innerHTML = `
        
          <button class="text-xs px-3 py-1 bg-yellow-100 border border-yellow-400 text-yellow-600 rounded-full font-bold"><i class="fa-solid fa-file-circle-exclamation"></i> ${label}</button>

        `;
    labelContainer.append(labelButton);

    }

     else if(label==='help wanted')
    {

        console.log(label);
           labelButton.innerHTML = `
        
          <button class="text-xs px-3 py-1 bg-blue-100 border border-blue-400 text-blue-600 rounded-full font-bold"><i class="fa-brands fa-hire-a-helper"></i> ${label}</button>

        `;
    labelContainer.append(labelButton);

    }
     else if(label==='enhancement')
    {

        console.log(label);
           labelButton.innerHTML = `
        
          <button class="text-xs px-3 py-1 bg-green-100 border border-green-400 text-green-600 rounded-full font-bold"><i class="fa-solid fa-arrow-up-right-dots"></i> ${label}</button>

        `;
    labelContainer.append(labelButton);

    }

    else
    {

           console.log(label);
           labelButton.innerHTML = `
        
          <button class="text-xs px-3 py-1 bg-gray-100 border border-gray-400 text-gray-600 rounded-full font-bold"><i class="fa-solid fa-triangle-exclamation"></i> ${label}</button>

        `;
    labelContainer.append(labelButton);


    }
  }

  const priorityDv = ic.querySelector('.priority-card');
  priorityDv.innerHTML="";

  const priorityBadge = document.createElement('p');

      if(issue.priority==='high')
    {
        priorityBadge.innerHTML=`

         <p class=" px-4 py-1 rounded-full border-2 bg-red-300 border-l-red-700 font-bold text-red-800">${issue.priority}</p>
        `;
        priorityDv.append(priorityBadge);

    }
    else if(issue.priority==='medium')
    {
         priorityBadge.innerHTML=`

         <p class=" px-4 py-1 rounded-full border-2 bg-orange-300 border-l-orange-700 font-bold text-orange-800">${issue.priority}</p>
        `;
        priorityDv.append(priorityBadge);
    }
    else if(issue.priority==='low')
    {
         priorityBadge.innerHTML=`

         <p class=" px-4 py-1 rounded-full border-2 bg-gray-300 border-gray-700 font-bold text-gray-800">${issue.priority}</p>
        `;
         priorityDv.append(priorityBadge);
    }




}

function loadClosed(issue, icContainer) 
{
  const container = icContainer;

  const ic = document.createElement("div");

  ic.innerHTML = `

     <div onclick="loadModal(${issue.id})" id="ic-crd-closed" class="p-5 bg-base-100 border-t-5 border-t-purple-500 shadow-md rounded-xl hover:shadow-xl hover:shadow-purple-300 transition ">

                <!-- Logo ar priority tag er div -->
                <div class="flex justify-between items-center mb-3">

                    <div class="flex items-center gap-3">
                        <img class="w-9 h-9 rounded-full object-cover" src="./assets/Closed- Status .png" alt="">
                        <span class="text-sm font-medium text-gray-500">Closed</span>
                    </div>

                    <div class="priority-card">
                       
                    </div>
                
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

  for (label of labelsArr) 
    {
    const labelButton = document.createElement("button");
    
    if(label==='bug')
    {
        // console.log(label);
           labelButton.innerHTML = `
        
          <button class="text-xs px-3 py-1 bg-red-100 border border-red-400 text-red-600 rounded-full font-bold"> <i class="fa-solid fa-bug"></i> ${label}</button>

        `;
    labelContainer.append(labelButton);
    }

    else if(label==='documentation')
    {

        // console.log(label);
           labelButton.innerHTML = `
        
          <button class="text-xs px-3 py-1 bg-yellow-100 border border-yellow-400 text-yellow-600 rounded-full font-bold"><i class="fa-solid fa-file-circle-exclamation"></i> ${label}</button>

        `;
    labelContainer.append(labelButton);

    }

     else if(label==='help wanted')
    {

        // console.log(label);
           labelButton.innerHTML = `
        
          <button class="text-xs px-3 py-1 bg-blue-100 border border-blue-400 text-blue-600 rounded-full font-bold"><i class="fa-brands fa-hire-a-helper"></i> ${label}</button>

        `;
    labelContainer.append(labelButton);

    }
     else if(label==='enhancement')
    {

        // console.log(label);
           labelButton.innerHTML = `
        
          <button class="text-xs px-3 py-1 bg-green-100 border border-green-400 text-green-600 rounded-full font-bold"><i class="fa-solid fa-arrow-up-right-dots"></i> ${label}</button>

        `;
    labelContainer.append(labelButton);

    }

    else
    {

        //    console.log(label);
           labelButton.innerHTML = `
        
          <button class="text-xs px-3 py-1 bg-gray-100 border border-gray-400 text-gray-600 rounded-full font-bold"><i class="fa-solid fa-triangle-exclamation"></i> ${label}</button>

        `;
    labelContainer.append(labelButton);


    }
   

 
  }


  const priorityDv = ic.querySelector('.priority-card');
  priorityDv.innerHTML="";

  const priorityBadge = document.createElement('p');

      if(issue.priority==='high')
    {
        priorityBadge.innerHTML=`

         <p class=" px-4 py-1 rounded-full border-2 bg-red-300 border-l-red-700 font-bold text-red-800">${issue.priority}</p>
        `;
        priorityDv.append(priorityBadge);

    }
    else if(issue.priority==='medium')
    {
         priorityBadge.innerHTML=`

         <p class=" px-4 py-1 rounded-full border-2 bg-orange-300 border-l-orange-700 font-bold text-orange-800">${issue.priority}</p>
        `;
        priorityDv.append(priorityBadge);
    }
    else if(issue.priority==='low')
    {
         priorityBadge.innerHTML=`

         <p class=" px-4 py-1 rounded-full border-2 bg-gray-300 border-gray-700 font-bold text-gray-800">${issue.priority}</p>
        `;
         priorityDv.append(priorityBadge);
    }

}

function loadIssues(issues) 
{
  const issueContainer = document.getElementById("ic-container");
  issueContainer.innerHTML = "";

  for (let issue of issues) 
    {
    if (issue.status === "open") 
    {
      loadOpen(issue, issueContainer);
    } 
    else if (issue.status === "closed") 
    {
      loadClosed(issue, issueContainer);
    }
  }
}

// open Issue load
function loadIssuesOpen(issues) {
  const issueContainer = document.getElementById("ic-container");
  issueContainer.innerHTML = "";

  for (let issue of issues) {
    if (issue.status === "open") {
      loadOpen(issue, issueContainer);
    }
  }
}

// closed issue load
function loadIssuesClosed(issues) {
  const issueContainer = document.getElementById("ic-container");
  issueContainer.innerHTML = "";

  for (let issue of issues) {
    if (issue.status === "closed") {
      loadClosed(issue, issueContainer);
    }
  }
}

// Initially loading all cards , prothome dekhate hobe sob.
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

// count Render Functions
function renderAllCounter() 
{
  const AllCounter = document.getElementById("issue-num");
  AllCounter.innerText = issuesALl.length;
}

function renderOpenCounter() 
{
  const AllCounter = document.getElementById("issue-num");
  AllCounter.innerText = issuesOpen.length;
}

function renderClosedCounter() 
{
  const AllCounter = document.getElementById("issue-num");
  AllCounter.innerText = issuesClosed.length;
}

// Modal Data load
async function loadModal(id) 
{

    const url =`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;


    const res = await fetch(url);

    const modalIssue = await res.json();

    const issue = modalIssue.data;

    if(issue.status==='open')
    {

        const openModalContainer = document.getElementById('modal_open');
        openModalContainer.innerHTML="";


        const modalOpen = document.createElement('section');

        modalOpen.innerHTML=`

         <dialog id="my_modal_1" class="modal">
            <div class="modal-box max-w-3xl">

                <h3 class="text-3xl font-bold mb-3">${issue.title}</h3>

                <div class="flex items-center gap-3 text-sm mb-4">
                    
                    <p class=" px-3 py-1 rounded-full border-2 font-bold bg-green-200 text-green-800 border-green-700">${issue.status}</p>

                    <p class="text-gray-500">  <i class="fa-solid fa-circle"></i> Opened By -  ${issue.author ?  issue.author : `Something Went Wrong!`}  <i class="fa-solid fa-circle"></i>  ${issue.createdAt}</p>
                </div>

                <div class="flex gap-3 mb-4 modal-tag-div">
                  
                </div>

                <p class="text-gray-600 mb-6  "> ${issue.description}</p>

                <div class="bg-gray-100 rounded-xl p-5 flex justify-between items-center mb-6">
                    <div>
                        <p class="text-gray-500">Assignee:</p>
                        <p class="font-semibold text-lg">${issue.assignee?issue.assignee : `No Assignee Yet`}</p>
                    </div>

                    <div class="">
                        <p class="text-gray-500 mb-1">Priority:</p>
                        <div class="modal-priority">
                            
                        </div>
                    </div>
                </div>

                
                <div class="modal-action">
                    <form method="dialog">
                        <button class="btn btn-primary text-white border-none">Close</button>
                    </form>
                </div>

            </div>
        </dialog>
        
        
        
        `;

    openModalContainer.append(modalOpen);


    const labelContainer = modalOpen.querySelector(".modal-tag-div");
    const labelsArr = issue.labels;

    for (label of labelsArr) 
    {
    const labelButton = document.createElement("button");
    
    if(label==='bug')
    {
        // console.log(label);
           labelButton.innerHTML = `
        
          <button class="text-xs px-3 py-1 bg-red-100 border border-red-400 text-red-600 rounded-full font-bold"> <i class="fa-solid fa-bug"></i> ${label}</button>

        `;
    labelContainer.append(labelButton);
    }

    else if(label==='documentation')
    {

        // console.log(label);
           labelButton.innerHTML = `
        
          <button class="text-xs px-3 py-1 bg-yellow-100 border border-yellow-400 text-yellow-600 rounded-full font-bold"><i class="fa-solid fa-file-circle-exclamation"></i> ${label}</button>

        `;
    labelContainer.append(labelButton);

    }

     else if(label==='help wanted')
    {

        // console.log(label);
           labelButton.innerHTML = `
        
          <button class="text-xs px-3 py-1 bg-blue-100 border border-blue-400 text-blue-600 rounded-full font-bold"><i class="fa-brands fa-hire-a-helper"></i> ${label}</button>

        `;
    labelContainer.append(labelButton);

    }
     else if(label==='enhancement')
    {

        // console.log(label);
           labelButton.innerHTML = `
        
          <button class="text-xs px-3 py-1 bg-green-100 border border-green-400 text-green-600 rounded-full font-bold"><i class="fa-solid fa-arrow-up-right-dots"></i> ${label}</button>

        `;
    labelContainer.append(labelButton);

    }

    else
    {

        //    console.log(label);
           labelButton.innerHTML = `
        
          <button class="text-xs px-3 py-1 bg-gray-100 border border-gray-400 text-gray-600 rounded-full font-bold"><i class="fa-solid fa-triangle-exclamation"></i> ${label}</button>

        `;
    labelContainer.append(labelButton);


    }
   

 
  }

    const prior = modalOpen.querySelector('.modal-priority');

    const priortag = document.createElement('p');
    priortag.innerHTML="";

    if(issue.priority==='high')
    {
        priortag.innerHTML=`

         <p class=" px-4 py-1 rounded-full border-2 bg-red-300 border-red-700 font-bold text-red-800">${issue.priority}</p>
        `
        prior.append(priortag);

    }
    else if(issue.priority==='medium')
    {
         priortag.innerHTML=`

         <p class=" px-4 py-1 rounded-full border-2 bg-orange-300 border-orange-700 font-bold text-orange-800">${issue.priority}</p>
        `
         prior.append(priortag);
    }
    else if(issue.priority==='low')
    {
         priortag.innerHTML=`

         <p class=" px-4 py-1 rounded-full border-2 bg-gray-300 border-gray-700 font-bold text-gray-800">${issue.priority}</p>
        `
         prior.append(priortag);
    }

   
    my_modal_1.showModal();
   }

   else if(issue.status==='closed')
   {


     const openModalContainer = document.getElementById('modal_open');
        openModalContainer.innerHTML="";


        const modalOpen = document.createElement('section');

        modalOpen.innerHTML=`

         <dialog id="my_modal_1" class="modal">
            <div class="modal-box max-w-3xl">

                <h3 class="text-3xl font-bold mb-3">${issue.title}</h3>

                <div class="flex items-center gap-3 text-sm mb-4">
                    
                    <p class=" px-3 py-1 rounded-full border-2 font-bold bg-purple-200 text-purple-800 border-purple-700">${issue.status}</p>

                    <p class="text-gray-500">  <i class="fa-solid fa-circle"></i> Closed By - ${issue.author ? issue.author : `Something Went Wrong!`}  <i class="fa-solid fa-circle"></i>  ${issue.createdAt}</p>
                </div>

                <div class="flex gap-3 mb-4 modal-tag-div">
                  
                </div>

                <p class="text-gray-600 mb-6  "> ${issue.description}</p>

                <div class="bg-gray-100 rounded-xl p-5 flex justify-between items-center mb-6">
                    <div>
                        <p class="text-gray-500">Assignee:</p>
                        <p class="font-semibold text-lg">${issue.assignee?issue.assignee : `No Assignee Yet`}</p>
                    </div>

                    <div class="">
                        <p class="text-gray-500 mb-1">Priority:</p>
                        <div class="modal-priority">
                            
                        </div>
                    </div>
                </div>

                
                <div class="modal-action">
                    <form method="dialog">
                        <button class="btn btn-primary text-white border-none">Close</button>
                    </form>
                </div>

            </div>
        </dialog>
        
        
        
        `;

    openModalContainer.append(modalOpen);


    const labelContainer = modalOpen.querySelector(".modal-tag-div");
    const labelsArr = issue.labels;

    for (label of labelsArr) 
    {
    const labelButton = document.createElement("button");
    
    if(label==='bug')
    {
        // console.log(label);
           labelButton.innerHTML = `
        
          <button class="text-xs px-3 py-1 bg-red-100 border border-red-400 text-red-600 rounded-full font-bold"> <i class="fa-solid fa-bug"></i> ${label}</button>

        `;
    labelContainer.append(labelButton);
    }

    else if(label==='documentation')
    {

        // console.log(label);
           labelButton.innerHTML = `
        
          <button class="text-xs px-3 py-1 bg-yellow-100 border border-yellow-400 text-yellow-600 rounded-full font-bold"><i class="fa-solid fa-file-circle-exclamation"></i> ${label}</button>

        `;
    labelContainer.append(labelButton);

    }

     else if(label==='help wanted')
    {

        // console.log(label);
           labelButton.innerHTML = `
        
          <button class="text-xs px-3 py-1 bg-blue-100 border border-blue-400 text-blue-600 rounded-full font-bold"><i class="fa-brands fa-hire-a-helper"></i> ${label}</button>

        `;
    labelContainer.append(labelButton);

    }
     else if(label==='enhancement')
    {

        // console.log(label);
           labelButton.innerHTML = `
        
          <button class="text-xs px-3 py-1 bg-green-100 border border-green-400 text-green-600 rounded-full font-bold"><i class="fa-solid fa-arrow-up-right-dots"></i> ${label}</button>

        `;
    labelContainer.append(labelButton);

    }

    else
    {

        //    console.log(label);
           labelButton.innerHTML = `
        
          <button class="text-xs px-3 py-1 bg-gray-100 border border-gray-400 text-gray-600 rounded-full font-bold"><i class="fa-solid fa-triangle-exclamation"></i> ${label}</button>

        `;
    labelContainer.append(labelButton);


    }
   

 
  }



    const prior = modalOpen.querySelector('.modal-priority');

    const priortag = document.createElement('p');
    priortag.innerHTML="";

    if(issue.priority==='high')
    {
        priortag.innerHTML=`

         <p class=" px-4 py-1 rounded-full border-2 bg-red-300 border-l-red-700 font-bold text-red-800">${issue.priority}</p>
        `
        prior.append(priortag);

    }
    else if(issue.priority==='medium')
    {
         priortag.innerHTML=`

         <p class=" px-4 py-1 rounded-full border-2 bg-orange-300 border-l-orange-700 font-bold text-orange-800">${issue.priority}</p>
        `
         prior.append(priortag);
    }
    else if(issue.priority==='low')
    {
         priortag.innerHTML=`

         <p class=" px-4 py-1 rounded-full border-2 bg-gray-300 border-gray-700 font-bold text-gray-800">${issue.priority}</p>
        `
         prior.append(priortag);
    }

    my_modal_1.showModal();

   }

   

}


// Searching Functionality

document.getElementById('btn-search').addEventListener('click', ()=>{


    const searchInput = document.getElementById('search-input');
    const searchValue = searchInput.value.trim().toLowerCase();

    // console.log(searchValue);


    loadSearchedIssue(searchValue);


})

//  loding searched issue from API 
async function loadSearchedIssue(searchValue)
{
    loading_icon(true);
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`;


    const res = await fetch(url);

    const SearchedIssues = await res.json();

    displaySearchedIssues(SearchedIssues.data);
    loading_icon(false);
}

// search issu display in UI
function displaySearchedIssues(issues)
{

    loadIssues(issues);

    const searchCounter = issues.length;

    if(searchCounter===0)
    {
        alert("No such Issue | Please Enter a Valid Keyword!");
        const AllCounter = document.getElementById("issue-num").innerText='0';
        return;
    }
    // console.log(searchCounter);
    const AllCounter = document.getElementById("issue-num");
    AllCounter.innerText=searchCounter;

    
}

// Loading Icon showing while fetching and creating the cards.
function loading_icon(boooleeaaan)
{
    const issueCardDiv = document.getElementById('issue-card-section');
    const loadingIcon = document.getElementById('loading');

    if(boooleeaaan)
    {
        issueCardDiv.classList.add('hidden');
        loadingIcon.classList.remove('hidden');
    }
    else
    {
        loadingIcon.classList.add('hidden');
        issueCardDiv.classList.remove('hidden');
    }
}







