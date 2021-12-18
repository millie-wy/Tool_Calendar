function initIntro() {
    displayCurrentDate();
    startClock();
    renderBackground();
}

/** Displays current date */
function displayCurrentDate() {
    const today = new Date();
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
    displayCurrentDate();
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

/** Renders background based on current (real time) month */
function renderBackground() {
    const bgSrc = document.getElementById('lottie');
    const currentMonth = new Date().getMonth();
    let lottieName = "";
    switch (currentMonth) {
        case 11:
        case 0:
        case 1:
            lottieName = "lf20_vrbtloig";
            break;
        case 2:
        case 3: 
        case 4:
            lottieName = "lf20_anqiva4s";
            break;
        case 5:
        case 6:
        case 7: 
            lottieName = "lf20_fm0ra1ob";
            break;
        case 8:
        case 9:
        case 10:
            lottieName = "lf20_d4atdgyz";
            break;
    } 
    bgSrc.load(`https://assets8.lottiefiles.com/packages/${lottieName}.json`);
}