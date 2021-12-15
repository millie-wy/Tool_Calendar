window.addEventListener('load', main);

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
    console.log('hej')
}

function addEventListeners() {
    console.log('hello')

    /** Renders calender to previous month on button click */
    document.querySelector('.prev').addEventListener('click', () => {
    calendar.prev();
    renderCalendar(calendar.currentDate);
    fetchHolidaysForThreeYears();
    })

    /** Renders calender to next month on button click */
    document.querySelector('.next').addEventListener('click', () => {
    calendar.next();
    renderCalendar(calendar.currentDate);
    fetchHolidaysForThreeYears();
    })

    /** Expands or collapse todo list on button click */
    const expandBtns = document.querySelectorAll('.todo-fold'); 
    expandBtns.forEach(expandBtn => {
    expandBtn.addEventListener('click', toggleTodo);
    })

}