function initCalendar() {
    renderCalendar();
    fetchHolidays2021();
}

function renderCalendar() {
    today.setDate(1); 

    // Number of days of current month
    const lastDayOfCurrentMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

    // Number of days in previous month
    const lastDayOfPrevMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();

    console.log(today.getDay());
    // 
    let daysFromPrevMonth = 0;
    if (today.getDay() - 1 < 0) {
        daysFromPrevMonth = (7 - today.getDay()) - 1; //minus here because we want to start the month on a Monday
    } else {
        daysFromPrevMonth = today.getDay() - 1;
    }
   
    //const daysFromNextMonth = (7 * 6) - (daysFromPrevMonth + lastDayOfCurrentMonth);

    let daysFromNextMonth = 0;
    const remainder = (daysFromPrevMonth + lastDayOfCurrentMonth) % 7;
    if (remainder !== 0) {
        daysFromNextMonth = 7 - remainder;
    };
        
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",];

    document.querySelector(".date > h1").innerHTML = months[today.getMonth()];
    document.querySelector('.date > p').innerHTML = today.getFullYear();

    let days = "";
    const monthDays = document.querySelector('.days'); 

    //Fill previous month
    // x = 2; x > 0; x--   so it gets x = 2 and then x = 1
    for(let x = daysFromPrevMonth; x > 0; x--) {
        let date = new Date();
        date.setFullYear(today.getFullYear())
        date.setMonth(today.getMonth() - 1);
        date.setDate(lastDayOfPrevMonth - x + 1);
        let dateClass = formatDate(date.getFullYear(), (date.getMonth() + 1), (lastDayOfPrevMonth - x + 1));
        days += `<div class="${dateClass} prev-date">${lastDayOfPrevMonth - x + 1}</div>`
    }

    //Fill current month
    for ( let i = 1; i <= lastDayOfCurrentMonth; i++) {
        let dateClass = formatDate(today.getFullYear(), (today.getMonth() + 1), (today.getDate() + i - 1));
        if (today.getDate() + i - 1 == new Date().getDate() && today.getMonth() === new Date().getMonth() && today.getFullYear() === new Date().getFullYear()) {
            days += `<div class="${dateClass} today">${i}</div>`
        } else {
            days += `<div class="${dateClass}">${i}</div>`
        }
    }

    //Fill next month
    for(let j = 1; j <= daysFromNextMonth; j++) {
        let date = new Date();
        date.setFullYear(today.getFullYear())
        date.setMonth(today.getMonth() + 1);
        date.setDate(j);
        let dateClass = formatDate(date.getFullYear(), (date.getMonth() + 1), date.getDate());
        days += `<div class="${dateClass} next-date">${j}</div>`;
    }
    
    monthDays.innerHTML = days;
}

function formatDate(yy, mm, dd) { 
    if (yy < 10) yy = "0" + yy;
    if (mm < 10) mm = "0" + mm;
    if (dd < 10) dd = "0" + dd;
    return yy + "" + mm + "" + dd;
}

async function fetchHolidays2021() {
    const response = await fetch ('http://sholiday.faboul.se/dagar/v2.1/2021');
    const data = await response.json();
    //console.log(data) 

    const holidays21 = data.dagar.filter((day) => day.helgdag);
    console.log(holidays21)

    for (let i = 0; i < holidays21.length; i++ ) {
        const holidayDates21 = new Date(holidays21[i].datum);
        let searchClassName = formatDate(holidayDates21.getFullYear(), (holidayDates21.getMonth() + 1), holidayDates21.getDate());
        let dayDiv = document.getElementsByClassName(searchClassName);
        if ( dayDiv.length > 0) {
            printHolidaysToCalendar(dayDiv[0], holidays21[i].helgdag)
        }
    } 
}

function printHolidaysToCalendar(dayDiv, holidays21) { 
    const reminderDiv = document.createElement('div');
    reminderDiv.className = 'reminder';
    reminderDiv.innerHTML = holidays21;
    dayDiv.append(reminderDiv);
}