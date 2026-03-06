// console.log("Script js Running");

const btnAll = document.getElementById("btn-all");
const btnOpen = document.getElementById("btn-open");
const btnClosed = document.getElementById("btn-closed");

function toggleButton(id) 
{
  btnAll.classList.remove("btn-primary");
  btnOpen.classList.remove("btn-primary");
  btnClosed.classList.remove("btn-primary");

  const clicked = document.getElementById(id);

  clicked.classList.add("btn-primary");
}

function toggle(id) 
{
  toggleButton(id);
}
