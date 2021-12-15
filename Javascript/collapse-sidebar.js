function addEventListeners() {
    document.querySelector('#todo-fold').addEventListener('click', () => {
    toggleTodoExpand();
    })
}

// toggle collapse of specified content

function toggleTodoExpand() {
    console.log('clicked')
    const todoTodayDiv = document.getElementById('todoToday');
    const todoList = document.getElementById('todoList');
        if (todoTodayDiv.style.height === "13rem") {
            console.log('Hello')
            todoList.style.display = "none";
        
        } else {
          console.log('bye')
          todoList.style.display = "none";
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