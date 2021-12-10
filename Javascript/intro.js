function initIntro() {
    displayCurrentDate();
    startClock();
}

function addEventListeners() {
    
}

// Global variables 

/** Displays current date */
function displayCurrentDate() {
    const dateDisplay = document.querySelector('#current-date');
    dateDisplay.innerHTML = today.toDateString();
}

/** Starts clock and make web client repeatedly render the clock */
function startClock() {
    setInterval(renderClock);
}

/** Updates current time */ 
function renderClock() {
    const today = new Date();
    const timeDisplay = document.querySelector('#current-time');
    timeDisplay.innerHTML = getCurrentTime(today);
}

/**
 * Gets and formats current time
 * @param {Date} today 
 * @returns {String} in format hh:mm:ss
 */
function getCurrentTime(today) {
    let hours = today.getHours();
    let minutes = today.getMinutes();
    let seconds = today.getSeconds();

    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;
    return hours + ":" + minutes + ":" + seconds;
}