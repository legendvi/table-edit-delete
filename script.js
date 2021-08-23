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
const gender = document.querySelector("#Gender");
const food = document.querySelectorAll(".Checkbox");
const pincode = document.querySelector("#Pincode");
const address = document.querySelector("#Address");
const state = document.querySelector("#State");
const country = document.querySelector("#Country");
//Array to store all objects created
let rowArray = [];
//state and element where we have to Edit
let editing = false;
let editElement;
console.log(gender);
//----------------------------------------------------------------------------------------------------
//Class table to store the row data in object---------------------------------------------------------
class Table {
  constructor(
    firstname,
    lastname,
    email,
    address,
    pincode,
    gender,
    checkedFood,
    state,
    country
  ) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.id = this.count;
    this.address = address;
    this.pincode = pincode;
    this.gender = gender;
    this.checkedFood = checkedFood;
    this.state = state;
    this.country = country;
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
   <td>${curElement.address}</td>
   <td>${curElement.pincode}</td>
   <td>${curElement.gender}</td>
   <td>${curElement.checkedFood}</td>
   <td>${curElement.state}</td>
   <td>${curElement.country}</td>
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
function changeElement(element, checkedFood) {
  element.firstname = firstname.value;
  element.lastname = lastname.value;
  element.email = email.value;
  element.address = address.value;
  element.pincode = pincode.value;
  element.gender = gender.value;
  element.checkedFood = checkedFood;
  element.state = state.value;
  element.country = country.value;
  editing = false;
  //----------------------------------------------------------------------------------------------------
}
//adding all the required event listner---------------------------------------------------------------

//create new element or call function to update exsiting element
form.addEventListener("submit", function (e) {
  e.preventDefault();
  //Array to store choice of food
  const checkedFood = [];
  food.forEach(function (el) {
    if (el.checked == true) {
      checkedFood.push(el.value);
    }
  });
  if (checkedFood.length < 2) {
    alert("Select at least two food items");
    return;
  }
  console.log(checkedFood);
  if (!editing) {
    const row = new Table(
      firstname.value,
      lastname.value,
      email.value,
      address.value,
      pincode.value,
      gender.value,
      checkedFood,
      state.value,
      country.value
    );
    rowArray.push(row);
  } else changeElement(editElement, checkedFood);
  firstname.value =
    lastname.value =
    email.value =
    address.value =
    pincode.value =
    state.value =
    country.value =
      "";
  gender.value = "";
  food.forEach((el) => (el.checked = false));
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
    address.value = editElement.address;
    pincode.value = editElement.pincode;
    gender.value = editElement.gender;
    state.value = editElement.state;
    country.value = editElement.country;
    food.forEach((element) => {
      if (editElement.checkedFood.includes(element.value)) {
        element.checked = true;
      }
    });
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
//add event Listener to reset button
btn_reset.addEventListener("click", reset);
//----------------------------------------------------------------------------------------------------
