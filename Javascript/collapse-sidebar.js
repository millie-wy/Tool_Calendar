// toggle collapse of specified content

/**
 * Expand of collapse todo lists and render button class on click 
 * @param {Event} event // pointer event for expand/collapse button
 */
function toggleTodo(event) {
    let expandBtn = event.target;
    let parentDiv = event.target.parentNode;
    let todoList = parentDiv.nextElementSibling;
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


// collapse all open content
// function collapseAllContent
  



/*
// toggle collapse of specified content
function toggleContent(content) {
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + 'px';
    }
  }
  
  // collapse all open content
  function collapseAllOpenContent() {
    const colls = document.getElementsByClassName('collapsible');
    for (const coll of colls) {
      if (coll.classList.contains('active')) {
        coll.classList.remove('active');
        toggleContent(coll.nextElementSibling);
      }
    }
  */