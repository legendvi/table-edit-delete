"use strict";
//select Dom button Elements-------------------------------------------------------------------------
const btn_submit = document.querySelector("#submit");
const btn_edit = document.querySelector("#edit");
const btn_delete = document.querySelector("#delete");
const btn_reset = document.querySelector("#reset");
const form = document.querySelector("#form");
const table = document.querySelector("table");
//select Table body----------------------------------
const tbody = document.querySelector("#tbody");
// Selecting input boxes
const firstname = document.querySelector("#FirstName");
const lastname = document.querySelector("#LastName");
const email = document.querySelector("#Email");
//Array to store all objects created
let rowArray = [];
//state and element where we have to Edit
let editing = false;
let editElement;
//----------------------------------------------------------------------------------------------------

//Class table to store the row data in object---------------------------------------------------------
class Table {
  constructor(firstname, lastname, email) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.id = this.count;
  }
}
//----------------------------------------------------------------------------------------------------
//Required functions----------------------------------------------------------------------------------
//This function updates the table according to the elements present in the array
function updateTable() {
  let html = "";
  let count = 0;
  rowArray.forEach(function (element) {
    const curElement = element;
    curElement.id = count;
    html += `<tr id=${curElement.id}>
  <td>${curElement.firstname}</td>
  <td>${curElement.lastname}</td>
  <td>
   ${curElement.email}
   </td>
   <td>
    <button class="btn btn-secondary ms-3 edit btn-sm" >
      Edit
    </button>
    <button class="btn btn-danger ms-3 delete btn-sm" >
      Delete
    </button>
  </td>
</tr>`;
    count++;
  });

  // console.log(curElement.email.padEnd(80, " &nbsp "));
  tbody.innerHTML = html;
  setLocal();
}
//Element that changes after clicking edit
function changeElement(element) {
  element.firstname = firstname.value;
  element.lastname = lastname.value;
  element.email = email.value;
  editing = false;
  //----------------------------------------------------------------------------------------------------
}
//adding all the required event listner---------------------------------------------------------------

//create new element or call function to update exsiting element
form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (!editing) {
    const row = new Table(firstname.value, lastname.value, email.value);
    rowArray.push(row);
  } else changeElement(editElement);
  firstname.value = lastname.value = email.value = "";

  updateTable();
});
//Listen to click event in table and look for target delete to delete selected row
table.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete")) {
    const tr = e.target.closest("tr");
    console.log(tr.id);
    const element = rowArray.findIndex((el) => parseInt(tr.id) === el.id);

    rowArray.splice(element, 1);

    updateTable();
  }
});
//Listen to click event in table and look for target delete to edit selected row
table.addEventListener("click", function (e) {
  if (e.target.classList.contains("edit")) {
    const tr = e.target.closest("tr");
    editElement = rowArray.find((el) => parseInt(tr.id) === el.id);

    firstname.value = editElement.firstname;
    lastname.value = editElement.lastname;
    email.value = editElement.email;
    editing = true;
  }
});
//-----------------------------------------------------------------------------------------------------
//Setting Retrieving and deleting Local storage-------------------------------------------------------

//set local Storage
function setLocal() {
  localStorage.setItem("table", JSON.stringify(rowArray));
}
//Array to get back Elements from Local
let localArray = JSON.parse(localStorage.getItem("table"));
if (localArray) {
  rowArray = localArray;
  updateTable();
}
//reset Local Storage
function reset() {
  localStorage.removeItem("table");
  location.reload();
}
//rest add event Listener
btn_reset.addEventListener("click", reset);
//----------------------------------------------------------------------------------------------------
