let browser = "";
let focusElement;
let links = document.getElementsByTagName("a");
let todos = document.querySelectorAll(".todo");
let addBtn = document.querySelector(".fa-plus");
let createLink = document.querySelector("[href='/todo/create']");

if (todos.length > 7) moveAddBtn();

browser = navigator.userAgent;
if (browser.includes("Firefox")) autofocus();

addBtn.addEventListener("mouseover", () => {
  addBtn.classList.add("fa-plus-circle");
  addBtn.style.transform = "scale(1.2)";
});
createLink.addEventListener("focus", () => {
  addBtn.classList.add("fa-plus-circle");
  addBtn.style.transform = "scale(1.2)";
});
addBtn.addEventListener("mouseout", () => {
  addBtn.classList.remove("fa-plus-circle");
  addBtn.style.transform = "scale(1)";
});
createLink.addEventListener("focusout", () => {
  addBtn.classList.remove("fa-plus-circle");
  addBtn.style.transform = "scale(1)";
});

for (let i = 0; i < links.length; i++) {
  let link = links[i];
  link.onmouseover = function () {
    this.setAttribute("org_title", this.title);
    this.title = "";
  };
  link.onmouseout = function () {
    this.title = this.getAttribute("org_title");
  };
  link.onfocus = function () {
    this.setAttribute("org_title", this.title);
    this.title = "";
  };
  link.onfocusout = function () {
    this.setAttribute("org_title", this.title);
  };
}

function autofocus() {
  focusElement = document.querySelector("[autofocus]");
  if (focusElement) focusElement.focus();
}

function moveAddBtn() {
  addBtn.style.top = "2rem";
}
