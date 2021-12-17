function initCalendar(currentDate) {
    renderCalendar(currentDate);
    fetchHolidaysForThreeYears();  
    showNoOfTodosOnCalendar();
}

/**
 * Renders the calendar
 * @param {Date} currentDate 
 */
function renderCalendar(currentDate) {
    currentDate.setDate(1); 
    const lastDayOfCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const lastDayOfPrevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
    let daysFromPrevMonth = 0; 
    if (currentDate.getDay() - 1 < 0) { 
        daysFromPrevMonth = (7 - currentDate.getDay()) - 1; 
    } else {
        daysFromPrevMonth = currentDate.getDay() - 1;
    };
   
    let daysFromNextMonth = 0; 
    const remainder = (daysFromPrevMonth + lastDayOfCurrentMonth) % 7; 
    if (remainder !== 0) {
        daysFromNextMonth = 7 - remainder;
    };
        
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",];

    document.querySelector(".date > h1").innerHTML = months[currentDate.getMonth()];
    document.querySelector('.date > p').innerHTML = currentDate.getFullYear();

    let days = "";
    const monthDays = document.querySelector('.days'); 

    for(let x = daysFromPrevMonth; x > 0; x--) {
        let date = new Date(); 
        date.setFullYear(currentDate.getFullYear()) 
        date.setMonth(currentDate.getMonth() - 1); 
        date.setDate(lastDayOfPrevMonth - x + 1); 
        let dateClass = formatDate(date.getFullYear(), (date.getMonth() + 1), (lastDayOfPrevMonth - x + 1));
        days += `<div class="${dateClass} prev-date day">${lastDayOfPrevMonth - x + 1}</div>` 
    }

    for ( let i = 1; i <= lastDayOfCurrentMonth; i++) {
        let dateClass = formatDate(currentDate.getFullYear(), (currentDate.getMonth() + 1), (currentDate.getDate() + i - 1));
        if (currentDate.getDate() + i - 1 == new Date().getDate() && currentDate.getMonth() === new Date().getMonth() && currentDate.getFullYear() === new Date().getFullYear()) {
            days += `<div class="${dateClass} today day">${i}</div>`
        } else {
            days += `<div class="${dateClass} day">${i}</div>`
        }
    }

    for(let j = 1; j <= daysFromNextMonth; j++) {
        let date = new Date();
        date.setFullYear(currentDate.getFullYear())
        date.setMonth(currentDate.getMonth() + 1);
        date.setDate(j);
        let dateClass = formatDate(date.getFullYear(), (date.getMonth() + 1), date.getDate());
        days += `<div class="${dateClass} next-date day">${j}</div>`;
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
    return yy + "-" + mm + "-" + dd;
}

/** Fetchs API data to get an array of the Swedish public holidays */
async function fetchHolidaysForThreeYears() {
    const currentYear = new Date().getFullYear();
    let holidays = [];
    for (let year = currentYear - 1; year <= currentYear + 1; year++) {
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
}

/** Run function for retrieving the class name as a calendar day clicked */
function clickCalendarDay() {
    const dayBtns = document.querySelectorAll('.day');
    dayBtns.forEach(dayBtn => {
        dayBtn.addEventListener('click', getFirstClassNameOfDay);
        })
    }

/** Retrieves one fo the class names and converts it to date string */
function getFirstClassNameOfDay() {
    let dayBtn = event.target;
    let classNameOfDay = dayBtn.className.split(" ")[0];
    console.log({classNameOfDay})
    const selectedDate = new Date(classNameOfDay);
    showTodosSelectedDate(selectedDate);
}

/** Splits class name of calendar day and compare it with items on todo list */
function showNoOfTodosOnCalendar() {
    let days = document.getElementsByClassName('day'); 
    let daysArr = [];
    for (let i = 0; i < days.length; i++) {
        daysArr = (days[i].className.split(" ")[0]);

        let todoArr = getTodoList();
        const filter = todoArr.filter(element => { return new Date(element.date).toDateString() == new Date(daysArr).toDateString() });
        filter.forEach((element, index) => {
            let todoNumber = index + 1;
            let dayDiv = document.getElementsByClassName(element.date);
            if (filter.length > 0) { 
                printTodoToCalendar(dayDiv[0], todoNumber)
            }
        });
    } 
}

/**
 * Prints the number of todos in the div for calendar days
 * @param {String} dayDiv 
 * @param {String} todoNumber 
 */
 function printTodoToCalendar(dayDiv, todoNumber) {
    const todoReminderDiv = document.createElement('div');
    todoReminderDiv.className = 'todo-reminder';
    todoReminderDiv.innerText = todoNumber;
    dayDiv.append(todoReminderDiv);
}