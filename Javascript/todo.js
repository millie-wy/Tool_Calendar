

/** comment by Millie - this is created for you to put functions for buttons or keydown - refer to intro.js :) */
function addEventListeners() {

}

const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");

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
        addBtn.classList.remove("active") // unactivates the add button
}

//function to add task list inside ul
function showTasks(){
    let getLocalStorage = localStorage.getItem("New Todo");
    if(getLocalStorage === null){ // if localstorage is empty
        todoArr = [] // blank array
    }else{
        todoArr = JSON.parse(getLocalStorage); // transforming json string into a js object 
    }
    const pendingNumber = document.querySelector(".pendingNumber");
    pendingNumber.textContent = todoArr.length; //passing the lenght value in pendingNumber
    if(todoArr.length > 0){ // if array length is greater than 0
        deleteAllBtn.classList.add("active"); // active the clearall button
    }else{
        deleteAllBtn.classList.remove("active");// unactive the clearall button

    }

    let newLiTag = '';
    todoArr.forEach((element, index) => {
        newLiTag += `<li>${element}<span onclick="deleteTask(${index})";><i class="fas fa-trash"></i></span></li>`;
    });
    todoList.innerHTML = newLiTag; // adding new li tag inside ul tag
    inputBox.value = ""; // once task added leave the input 
}

// delete task function
function deleteTask (index){
    let getLocalStorage = localStorage.getItem("New Todo");
    todoArr = JSON.parse(getLocalStorage); 
    todoArr.splice(index, 1); //delete or remove the paricular indexed li
    // after remove the li again update the local storage 
    localStorage.setItem("New Todo", JSON.stringify(todoArr)); // transforming js object to a json string
    showTasks(); //calling showTasks function
}

// delete all tasks function
deleteAllBtn.onclick = ()=> {
    todoArr = []; // empty an array
    // after delete all task again update the local storage 
    localStorage.setItem("New Todo", JSON.stringify(todoArr)); // transforming js object to a json string
    showTasks(); //calling showTasks function
}




// LEFT TO DO: Pending task have to show 0. keep task when reload. Delete localstorage so it wont show old storage.