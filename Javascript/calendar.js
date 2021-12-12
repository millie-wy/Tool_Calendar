function initCalendar(currentDate) {
    renderCalendar(currentDate);
    fetchHolidaysForThreeYears();  
}

/** Renders the calendar */
function renderCalendar(currentDate) {
    currentDate.setDate(1);  // to set the day of the month to first day of the current month

    // to count the number of days in the current month
    const lastDayOfCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

    // to count the number of days in the previous month
    const lastDayOfPrevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();

    // to calculate how many days to be added from prev month in the current month (the minus 1 in this calculation is cuz we want to start the week from Monday)
    let daysFromPrevMonth = 0; // here means the no. of days to be added from prev month
    if (currentDate.getDay() - 1 < 0) { // if the last day of the prev month is less than 0 (logic: we have set the date to the first day of the current month, so here we minus 1 to return the day of the week for the last day of the prev month)
        daysFromPrevMonth = (7 - currentDate.getDay()) - 1; 
    } else {
        daysFromPrevMonth = currentDate.getDay() - 1;
    };
   
    // to calculate how many days to be added from the following month in the current month
    let daysFromNextMonth = 0; 
    const remainder = (daysFromPrevMonth + lastDayOfCurrentMonth) % 7; // sum of the 2 numbers and divid by 7 in order to get the remainder 
    if (remainder !== 0) {
        daysFromNextMonth = 7 - remainder;
    };
        
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",];

    document.querySelector(".date > h1").innerHTML = months[currentDate.getMonth()];
    document.querySelector('.date > p').innerHTML = currentDate.getFullYear();

    let days = "";
    const monthDays = document.querySelector('.days');  // to get the div for calendar days 

    // to create div to fill the prev month 
    // in dec 2021: x = 2; x > 0; x--; so the loop will get x = 2 and then x = 1
    for(let x = daysFromPrevMonth; x > 0; x--) {
        let date = new Date(); // get the date of today 12 december (as the date i wrote this comment)
        date.setFullYear(currentDate.getFullYear()) // set it to the year of today 
        date.setMonth(currentDate.getMonth() - 1);  // set it to the previous month of today 
        date.setDate(lastDayOfPrevMonth - x + 1); // set it to the last x days of the prev month, +1 because the count starts from 0
        // the below is to set the class name of the new div element for comparsion in the fetchPublicHoliday function 
        // logic: we have set the date from the above 4 lines and now we format it. We +1 in the month and day so they dont count from 0-11 but 1-12
        let dateClass = formatDate(date.getFullYear(), (date.getMonth() + 1), (lastDayOfPrevMonth - x + 1));
        days += `<div class="${dateClass} prev-date">${lastDayOfPrevMonth - x + 1}</div>` 
    }

    // to create div to fill the current month 
    // in dec 2021: i = 1; i <= 31; i++
    for ( let i = 1; i <= lastDayOfCurrentMonth; i++) {
        // we dont need to set a variable here because we are just using the variable today here. getDate has to - 1 because i = 1 and the smallest we can get from i++ is 2 so the days are 1-31 instead of 2-32
        let dateClass = formatDate(currentDate.getFullYear(), (currentDate.getMonth() + 1), (currentDate.getDate() + i - 1));
        // compare the current date in the loop to the actual Today
        if (currentDate.getDate() + i - 1 == new Date().getDate() && currentDate.getMonth() === new Date().getMonth() && currentDate.getFullYear() === new Date().getFullYear()) {
            days += `<div class="${dateClass} today">${i}</div>`
        } else {
            days += `<div class="${dateClass}">${i}</div>`
        }
    }

    // to create div to fill the next month
    for(let j = 1; j <= daysFromNextMonth; j++) {
        let date = new Date();
        date.setFullYear(currentDate.getFullYear())
        date.setMonth(currentDate.getMonth() + 1);
        date.setDate(j);
        let dateClass = formatDate(date.getFullYear(), (date.getMonth() + 1), date.getDate());
        days += `<div class="${dateClass} next-date">${j}</div>`;
    }
    
    monthDays.innerHTML = days; 
}

/**
 * Formats the dates that retrieved from API data
 * @param {Number} yy  year 
 * @param {Number} mm  month 
 * @param {Number} dd  day 
 * @returns {String}  in format yymmdd
 */
function formatDate(yy, mm, dd) { 
    if (yy < 10) yy = "0" + yy;
    if (mm < 10) mm = "0" + mm;
    if (dd < 10) dd = "0" + dd;
    return yy + "" + mm + "" + dd;
}

/** Fetchs API data to get an array of the Swedish public holidays */
async function fetchHolidaysForThreeYears() {
    const currentYear = new Date().getFullYear();
    let holidays = [];
    for (let year = currentYear - 1; year <= currentYear + 1; year++) {
        //const response = await fetch (`https://cors-anywhere.herokuapp.com/https://sholiday.faboul.se/dagar/v2.1/${year}`);
        const response = await fetch (`https://api.allorigins.win/get?url=${encodeURIComponent(`https://sholiday.faboul.se/dagar/v2.1/${year}`)}`);
        const data = await response.json();
        const json = JSON.parse(data.contents);
        const filteredHolidaysFromAPI = json.dagar.filter((day) => day.helgdag);
        holidays = holidays.concat(filteredHolidaysFromAPI);
    }

    for (let i = 0; i < holidays.length; i++ ) {
        const holidayDates = new Date(holidays[i].datum);
        let searchClassName = formatDate(holidayDates.getFullYear(), (holidayDates.getMonth() + 1), holidayDates.getDate());
        let dayDiv = document.getElementsByClassName(searchClassName);
        if ( dayDiv.length > 0) {
            printHolidaysToCalendar(dayDiv[0], holidays[i].helgdag)
        }
    } 
}

/**
 * Prints the name of the holiday to a new created div 
 * @param {String} dayDiv 
 * @param {String} holidays 
 */
function printHolidaysToCalendar(dayDiv, holidays) { 
    const reminderDiv = document.createElement('div');
    reminderDiv.className = 'holiday-reminder';
    reminderDiv.innerHTML = holidays;
    dayDiv.append(reminderDiv);

    // ********* IMPORTANT: to be moved under todo reminder function !!!!!!!!
    const todoReminderDiv = document.createElement('div');
    todoReminderDiv.className = 'todo-reminder';
    todoReminderDiv.innerText = '1'
    dayDiv.append(todoReminderDiv);
}
