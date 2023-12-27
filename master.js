// Choose Elements
let form = document.querySelector("form");
let input = document.querySelector(".add-task");
let add = document.querySelector("input[type = 'submit']");
let removeAll = document.querySelector("button");
let tasks = document.querySelector(".tasks");
let array = [];

// Stop Submit When Click On Add
form.onsubmit = (e) => e.preventDefault();

// Function
// ! Create Ul
let ul = document.createElement("ul");
ul.className = "ul-tasks";
tasks.appendChild(ul);

// Add Li to Ul And Delete Button
let addUl = function () {

  // If To Check Input Filed Wasn't Empty
  if (input.value.length > 0) {
    let li = document.createElement("li");
    li.className = "task";
    li.textContent = input.value;
    ul.appendChild(li);
    // todo Create Remove Button In Task
    let remove = document.createElement("div");
    remove.textContent = "delete";
    remove.className = "remove";
    li.appendChild(remove);
  }
};

// Delete Element After Click On Delete Button On li
document.addEventListener("click", function (e) {
  if (e.target.className == "remove") {
    e.target.parentElement.remove();
    // todo  هنا الحوار كله هنحذف اللوكال استوريج وهناخدها من الاريي اللي احنا مخزنين فيها القيم بتاعه ال ال <<إل اي>
    window.localStorage.clear();
    array.splice(
      array.indexOf(e.target.parentElement.firstChild.textContent),1);
    for (let i = 0; i < array.length; i++) {
      window.localStorage.setItem(`task${i + 1}`, array[i]);
    }
  }
});

// Remove All (local storage) and (li)
removeAll.onclick = function () {
  window.localStorage.clear();
  ul.replaceChildren();
  while (array.length > 0) {
    array.pop();
  }
};

// Add When Click
add.onclick = function () {
  addUl();
  if (input.value.length > 0) {
    array.push(input.value);
    for (let i = 0; i < array.length; i++) {
      window.localStorage.setItem(`task${i + 1}`, array[i]);
      input.value = "";
    }
  }
};

// When Refresh Window
window.onload = function () {
  for (let i = 0; i < window.localStorage.length; i++) {
    let li = document.createElement("li");
    li.className = "task";
    li.textContent = window.localStorage[`task${i + 1}`];
    ul.appendChild(li);

    let remove = document.createElement("div");
    remove.textContent = "delete";
    remove.className = "remove";
    li.appendChild(remove);
    array.push(ul.childNodes[i].firstChild.textContent);
  }
};