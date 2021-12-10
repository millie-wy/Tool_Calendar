function initIntro() {
    addEventListeners();
    displayCurrentDateAndTime();
}

function addEventListeners() {
 
}

/** Shows current date and time */
function displayCurrentDateAndTime() {
    const today = new Date();

    const dateDisplay = document.querySelector('#current-date');
    dateDisplay.innerHTML = today.toDateString();

    const timeDisplay = document.querySelector('#current-time');
    timeDisplay.innerHTML = today.getHours() + ":" + today.getMinutes();
}
