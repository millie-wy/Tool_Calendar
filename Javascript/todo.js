

/** comment by Millie - this is created for you to put functions for buttons or keydown - refer to intro.js :) */
function addEventListeners() {

}

const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");

inputBox.onkeyup = ()=>{
    let userData = inputBox.value; // getting user entered value
    if(userData.trim() != 0) {// if user values aren't only spaces
        addBtn.classList.add("active") // activates the add button
    } else {
        addBtn.classList.remove("active") // unactivates the add button
    }
}

// if user click on the add button
addBtn.onclick = ()=> {
    let userData = inputBox.value; // getting user entered value
    let getLocalStorage = localStorage.getItem("New Todo"); // Getting localstorage
    if(getLocalStorage == null) { // if localstorage is empty
        todoArr = [] // blank array
    } else {
        todoArr = JSON.parse(getLocalStorage); // transforming json string into a js object 
    }
        todoArr.push(userData); // pushing or adding user data
        localStorage.setItem("New Todo", JSON.stringify(todoArr)); // transforming js object to a json string
        showTasks(); //calling showTasks function
}

function showTasks(){
    let getLocalStorage = localStorage.getItem("New Todo");
    if(getLocalStorage == null) { // if localstorage is empty
        todoArr = [] // blank array
    } else{
        todoArr = JSON.parse(getLocalStorage); // transforming json string into a js object 
    }
    let newLiTag = '';
    todoArr.forEach((element, index) => {
        newLiTag = `<li>${element}<span><i class="fas fa-trash"></i></span></li>`;
    });
    todoList.innerHTML = newLiTag; // adding new li tag inside ul tag
}