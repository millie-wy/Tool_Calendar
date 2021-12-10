function initCalendar() {
    renderCalendar();
}

// Functions
function addEventListeners() {
    document.querySelector('.prev').addEventListener('click', () => {
    today.setMonth(today.getMonth() - 1);
    renderCalendar();
    })

    document.querySelector('.next').addEventListener('click', () => {
    today.setMonth(today.getMonth() + 1);
    renderCalendar();
    })
}

function renderCalendar() {
    today.setDate(1);

    // shows the last day of current month which is 31
    const lastDayOfCurrentMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

    // shows the last day of previous month which is 30
    const lastDayOfPrevMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();

    // shows the index of the first day of current month which is 2 (wed) 
    const firstDayIndex = today.getDay() - 1;

    // shows the index of the last dat of current month which is 4 (fri)
    const lastDayIndex = new Date(today.getFullYear(), today.getMonth() + 1, - 1).getDay();

    // counts how many days of next month to be shown in current month which is 2 (sat and sun)
    const daysFromNextMonth = 7 - lastDayIndex - 1 ;
    const months = [ 
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    document.querySelector(".date > h1").innerHTML = months[today.getMonth()];
    document.querySelector('.date > p').innerHTML = today.getFullYear();

    let days = "";
    const monthDays = document.querySelector('.days'); 

    // x = 2; x > 0; x--   so it gets x = 2 and then x = 1
    for(let x = firstDayIndex; x > 0; x--) {
        // 30 - 2 - 1 = 29 and 30 -1 - 1 = 30
    days += `<div class="prev-date">${lastDayOfPrevMonth - x + 1}</div>` 
    }

    for ( let i = 1; i <= lastDayOfCurrentMonth; i++) {
        if(i === new Date().getDate() && today.getMonth() === new Date().getMonth() && today.getFullYear() === new Date().getFullYear()) {
            days += `<div class="today">${i}</div>`
        } else {
            days += `<div>${i}</div>`
        }
    }

    for(let j = 1; j <= daysFromNextMonth; j++) {
        days += `<div class="next-date">${j}</div>`;
    }
    
    monthDays.innerHTML = days;
}
