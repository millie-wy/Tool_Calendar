// toggle collapse of specified content

/**
 * Expand of collapse todo lists and render button class on click 
 * @param {Event} event // pointer event for expand/collapse button
 */
function toggleTodo(event) {
    let expandBtn = event.target;
    let parentDiv = event.target.parentNode;
    let todoList = parentDiv.nextElementSibling;
    if (todoList === null) {
      return 
    }
    if (todoList.style.display !== "none") {
        todoList.style.display = "none";
        expandBtn.classList.remove('fa-minus-circle');
        expandBtn.classList.add('fa-plus-circle')
    } else {
      todoList.style.display = "block";
      expandBtn.classList.remove('fa-plus-circle');
      expandBtn.classList.add('fa-minus-circle');
    }
}

/** Displays/hides clear all button when toggling todo */
function toggleClearAllButton() {
    let parentDiv = event.target.parentNode;
    let todoList = parentDiv.nextElementSibling;
    const clearBtn = document.getElementById('clear-all-btn');
    if (todoList.style.display !== "none") {
      clearBtn.style.display = "block";
  } else {
      clearBtn.style.display = "none";
  }
}
