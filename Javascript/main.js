window.addEventListener('load', main);

/** Functions to start on page load */
function main() {
    initIntro();
    initTodo();
    initCalendar();
    addEventListeners();
}

// Gloabl variables 
const today = new Date();


function addEventListeners() {

    /** Renders calender to previous month on button click */
    document.querySelector('.prev').addEventListener('click', () => {
    today.setMonth(today.getMonth() - 1);
    renderCalendar();
    fetchHolidays2021();
    })

    /** Renders calender to next month on button click */
    document.querySelector('.next').addEventListener('click', () => {
    today.setMonth(today.getMonth() + 1);
    renderCalendar();
    fetchHolidays2021();
    })
}