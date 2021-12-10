function initCalendar() {
    addEventListeners()
    renderCalendar();
}

// Gloabl variables 
const today = new Date();

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

const renderCalendar = () => {
    today.setDate(1);
    const monthDays = document.querySelector('.days');
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const prevLastDay = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    const firstDayIndex = today.getDay() - 1; // shows 3
    const lastDayIndex = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDay();
    const nextDays = 7 - lastDayIndex ;
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

    for(let x = firstDayIndex; x > 0; x--) {
    days += `<div class="prev-date">${prevLastDay -x + 1}</div>` 
    }

    for ( let i = 1; i <= lastDay; i++) {
        if(i === new Date().getDate() && today.getMonth() === new Date().getMonth()) {
            days += `<div class="today">${i}</div>`
        } else {
            days += `<div>${i}</div>`
        }
    }

    for(let j= 1; j <= nextDays; j++) {
        days += `<div class="next-date">${j}</div>`;
        monthDays.innerHTML = days;
    }
}