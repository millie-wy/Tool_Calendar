window.addEventListener('load', main);

/* Keeps track on the current month while prev/next month button clicked */
let calendar = {
    currentDate: new Date(),
    next() {
        this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    },
    prev() {
        this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    }
}

/** Functions to start on page load */
function main() {
    initIntro();
    initTodo();
    initCalendar(calendar.currentDate);
    addEventListeners();
    clickCalendarDay();
}

function addEventListeners() {

    /** Renders calender to previous month on button click */
    document.querySelector('.prev').addEventListener('click', () => {
    calendar.prev();
    renderCalendar(calendar.currentDate);
    fetchHolidaysForThreeYears();
    clickCalendarDay();
    showNoOfTodosOnCalendar()
    })

    /** Renders calender to next month on button click */
    document.querySelector('.next').addEventListener('click', () => {
    calendar.next();
    renderCalendar(calendar.currentDate);
    fetchHolidaysForThreeYears();
    clickCalendarDay();
    showNoOfTodosOnCalendar()
    })

    /** Expands or collapse todo list on button click */
    const expandBtns = document.querySelectorAll('.todo-fold'); 
    expandBtns.forEach(expandBtn => {
        expandBtn.addEventListener('click', toggleTodo);
    })
    expandBtns[0].addEventListener('click', toggleClearAllButton);

    /** Activates buttons for user when being pressed */
    const inputBox = document.querySelector(".inputField input");
    inputBox.addEventListener('keydown', pressedEnter);
    inputBox.addEventListener('keyup', validateInput);

    /** Changes date in validateInputs */
    const dateBox = document.querySelector(".todo-date");
    dateBox.addEventListener('change', validateInput);

    /** Creates a todo */
    const addBtn = document.querySelector(".inputField button");
    addBtn.addEventListener('click', createTodo);

    /** Deletes all tasks when "clear all"-button being clicked */
    const deleteAllTodaysTodoBtn = document.querySelector(".footer button");
    deleteAllTodaysTodoBtn.addEventListener('click', deleteAllTodaysTodo);

}

