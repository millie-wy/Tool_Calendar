function initTodo() {
    showTodosToday();
    showTodosAll();
}

const inputBox = document.querySelector(".inputField input");
inputBox.addEventListener('keydown', pressedEnter);
inputBox.addEventListener('keyup', validateInput);

const dateBox = document.querySelector(".todo-date");
dateBox.addEventListener('change', validateInput);
// dateBox.onchange = validateInput;    // same as this one

const addBtn = document.querySelector(".inputField button");
addBtn.addEventListener('click', createTodo);

const deleteAllTodaysTodoBtn = document.querySelector(".footer button");
deleteAllTodaysTodoBtn.addEventListener('click', deleteAllTodaysTodo);

const todoList = document.querySelector(".todoList-all");


function validateInput() {
    let userData = inputBox.value; // getting user entered value
    let dateData = new Date(dateBox.value); 
    let minDate = new Date(dateBox.min); // convert the string to a date
    if (userData.trim() != 0 && dateData >= minDate ) {// if user values aren't only spaces
        addBtn.classList.add("active") // activates the add button
    } else {
        addBtn.classList.remove("active") // unactivates the add button
    }
}

// if user click on the add button
function createTodo() {
    let userData = inputBox.value; // getting user entered value
    let dateData = dateBox.value; // getting user entered date
    let getLocalStorage = localStorage.getItem("New Todo"); // Getting localstorage
    if(getLocalStorage == null) { // if localstorage is empty
        todoArr = [] // blank array
    } else {
        todoArr = JSON.parse(getLocalStorage); // transforming json string into a js object 
    }
        todoArr.push({ description: userData, date: dateData }); // pushing or adding user data 
        localStorage.setItem("New Todo", JSON.stringify(todoArr)); // transforming js object to a json string
        showTodosAll(); //calling showTasks function
        showTodosToday();
        showNoOfTodosOnCalendar();
        addBtn.classList.remove("active") // unactivates the add button
}

// if user click enter to add todo
function pressedEnter(event) {
    if (event.keyCode === 13) {
        if (inputBox.value == "") {
            return false;
        }
        createTodo();
    }
}

function getTodoList() {
    let getLocalStorage = localStorage.getItem("New Todo");
    if(getLocalStorage === null){ // if localstorage is empty
        todoArr = [] // blank array
    } else{
        todoArr = JSON.parse(getLocalStorage); // transforming json string into a js object 
    }
    return todoArr;
}

function showTodosToday() {
    let todoArr = getTodoList();
    const todoListToday = document.querySelector(".todoList-today");
    const pendingNumber = document.querySelector(".pendingNumber");

    let newLiTag = '';
    const filter = todoArr.filter(element => { return new Date(element.date).toDateString() == new Date().toDateString() });
    filter.forEach((element, index) => {
        newLiTag += `<li>${element.description}<span class="edit" onclick="editTask(${index})";><i class="fas fa-edit"></i></span>  <span class="trash" onclick="deleteTask(${index})";><i class="fas fa-trash"></i></span></li>`
                ;
    });
    todoListToday.innerHTML = newLiTag; // adding new li tag inside ul tag
    inputBox.value = ""; // once task added leave the input 
    dateBox.value = "";

    pendingNumber.textContent = filter.length; //passing the lenght value in pendingNumber
    if(filter.length > 0){ // if array length is greater than 0
        deleteAllTodaysTodoBtn.classList.add("active"); // active the clearall button
    } else{
        deleteAllTodaysTodoBtn.classList.remove("active");// unactive the clearall button
    }
}

//function to add task list inside ul
function showTodosAll(){
    let todoArr = getTodoList();
    let newLiTag = '';
    // const filter = todoArr.filter(element => element.date == new Date())
    todoArr.forEach((element, index) => {
        newLiTag += `<li>${element.description}<p class="date-display">${element.date}</p><span class="edit" onclick="editTask(${index})";><i class="fas fa-edit"></i></span> <span class="trash" onclick="deleteTask(${index})";><i class="fas fa-trash"></i></span></li>`
    });
    todoList.innerHTML = newLiTag; // adding new li tag inside ul tag
    inputBox.value = ""; // once task added leave the input 
}

// delete task function
function deleteTask(index) {
    let getLocalStorage = localStorage.getItem("New Todo");
    todoArr = JSON.parse(getLocalStorage); 
    todoArr.splice(index, 1); // delete or remove the paricular indexed li
    // after remove the li again update the local storage 
    localStorage.setItem("New Todo", JSON.stringify(todoArr)); // transforming js object to a json string
    showTodosAll(); //calling showTasks function
    showTodosToday(); //calling showTodosToday function
}

// edit task function
function editTask(index) {
    let getLocalStorage = localStorage.getItem("New Todo");
    todoArr = JSON.parse(getLocalStorage);
    inputBox.value = todoArr[index].description;
    dateBox.value = todoArr[index].date;
    todoArr.splice(index, 1);
    localStorage.setItem("New Todo", JSON.stringify(todoArr));
    validateInput();
}

// delete all tasks function
function deleteAllTodaysTodo() {
    let getLocalStorage = localStorage.getItem("New Todo");
    todoArr = JSON.parse(getLocalStorage); 
    const filter = todoArr.filter(element => { return new Date(element.date).toDateString() !== new Date().toDateString() });
    todoArr = filter // empty an array
    // after delete all task again update the local storage 
    localStorage.setItem("New Todo", JSON.stringify(todoArr)); // transforming js object to a json string
    showTodosToday(); //calling showTasks function
    showTodosAll();
}

