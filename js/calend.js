const months = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
];

const daysOfWeek = [
    'Пн',
    'Вт',
    'Ср',
    'Чт',
    'Пт',
    'Сб',
    'Вн'
];

let date = new Date();
let currDay = date.getDay();
let currMonth = date.getMonth();
let currYear = date.getFullYear();
let daysOfMonth = elementByID('days');

function elementByID(id) {
    return document.getElementById(id);
}

function showCurrYear(year, month) {
    elementByID('month').textContent = `${months[month]} ${year}`
}

function showCurrMonth(year, month) {
    let firstDayMonth = new Date(year, month, 7).getDay();
    let lastDayMonth = new Date(year, month + 1, 0).getDate();
    let lastDayPrevMonth = new Date(year, month, 0).getDate();

    for (let i = 1; i <= lastDayMonth; i++) {
        if (i === 1) {
            let prevMonthDay = lastDayPrevMonth - firstDayMonth + 1;
            // console.log(prevMonthDay);
            for (let j = 0; j < firstDayMonth; j++) {
                let numberOfMonth = document.createElement('div');
                numberOfMonth.textContent = prevMonthDay;
                numberOfMonth.classList.add('day-name-number', 'inactive');
                daysOfMonth.append(numberOfMonth);
                prevMonthDay++;
            }
        }

        let numberOfMonth = document.createElement('div');
        numberOfMonth.textContent = i;
        numberOfMonth.classList.add('day-name-number');
        daysOfMonth.append(numberOfMonth);

        if (i === lastDayMonth) {
            let remainDays = new Date(year, month, i).getDay();
            let counterDays = 1;
            for (remainDays; remainDays < 7; remainDays++) {
                let numberOfMonth = document.createElement('div');
                numberOfMonth.textContent = counterDays;
                numberOfMonth.classList.add('day-name-number', 'inactive');
                daysOfMonth.append(numberOfMonth);
                counterDays++;
            }
        }
    }
}

function showNamesOfWeek() {
    elementByID('next').addEventListener('click', nextMonth);
    elementByID('prev').addEventListener('click', prevMonth);

    let title = elementByID('daysTitle');

    daysOfWeek.forEach((item) => {
        let nameOfDay = document.createElement('div');
        nameOfDay.textContent = item;
        nameOfDay.classList.add('day-name-number');
        title.append(nameOfDay);
        // console.log(nameOfDay);
    })

    showCurrYear(currYear, currMonth);
    showCurrMonth(currYear, currMonth);
}

function nextMonth() {
    if(currMonth === 11) {
        currMonth = 0;
        currYear++;
    } else {
        currMonth++;
    }

    elementByID('days').innerHTML = '';
    showCurrYear(currYear, currMonth);
    showCurrMonth(currYear, currMonth);
}

function prevMonth() {
    if(currMonth === 0) {
        currMonth = 11;
        currYear--;
    } else {
        currMonth--;
    }

    elementByID('days').innerHTML = '';
    showCurrYear(currYear, currMonth);
    showCurrMonth(currYear, currMonth);
}

showNamesOfWeek();