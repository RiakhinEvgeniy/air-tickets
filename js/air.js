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
    'Вс'
];

let date = new Date();
console.log(date)
let currDay = date.getDay();
let currMonth = date.getMonth();
let currYear = date.getFullYear();
let daysOfMonth = elementByID('days');

function elementByID(id) {
    return document.getElementById(id);
}

const boxCalendar = elementByID('calendar-box');
const btnShowCalendar = elementByID('img-cal');
const btnCloseCalendar = elementByID('btn-close');
const btnClearCalendar = elementByID('btn-clear');

let isDisplayCalendar = true;

boxCalendar.style.display = 'none';
btnShowCalendar.addEventListener('click', () => {
    showWindowCalendar();
})

btnCloseCalendar.addEventListener('click', () => {
    boxCalendar.style.display = 'none';
    isDisplayCalendar = !isDisplayCalendar;
})

function showWindowCalendar() {
    if(isDisplayCalendar) {
        boxCalendar.style.display = 'block';
        
    } else {
        boxCalendar.style.display = 'none';
    }
    isDisplayCalendar = !isDisplayCalendar;
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
        numberOfMonth.addEventListener('click', () => {
            selectDay(numberOfMonth);
        });

        allDaysOfMonth.push(numberOfMonth);
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

let counterClickedDays = 0;
let allDaysOfMonth = [];
let clickedDays = [];
let daysSelecteBetweendDays = [];

function selectDay(day) {
    if (counterClickedDays > 1) {
        counterClickedDays = 0;
        clickedDays.forEach(item => item.style.backgroundColor = 'inherit');
        clickedDays = [];
        daysSelecteBetweendDays.forEach(item => item.style.backgroundColor = 'inherit');
        daysSelecteBetweendDays = [];
    }

    if(clickedDays.length && +day.textContent < +clickedDays[0].textContent) {
        return
    }

    clickedDays.push(day);

    if (counterClickedDays === 1) {
        let firstClickedDay = allDaysOfMonth.indexOf(clickedDays[0]);
        let lastClickedDay = allDaysOfMonth.indexOf(clickedDays[1]);
        daysSelecteBetweendDays = allDaysOfMonth.slice(firstClickedDay+1, lastClickedDay);
        daysSelecteBetweendDays.forEach(item => {item.style.backgroundColor = 'red'});
    }

    day.style.backgroundColor = 'red';
    counterClickedDays++;
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
    })

    showCurrYear(currYear, currMonth);
    showCurrMonth(currYear, currMonth);
}

function nextMonth() {
    if (currMonth === 11) {
        currMonth = 0;
        currYear++;
    } else {
        currMonth++;
    }

    elementByID('days').innerHTML = '';
    showCurrYear(currYear, currMonth);
    showCurrMonth(currYear, currMonth);
}

function clearSelectDay() {
    clickedDays.forEach(item => item.style.backgroundColor = 'inherit');
    daysSelecteBetweendDays.forEach(item => item.style.backgroundColor = 'inherit');
}

btnClearCalendar.addEventListener('click', () => {
    clearSelectDay();
})

function prevMonth() {
    if (currMonth === 0) {
        currMonth = 11;
        currYear--;
    } else {
        currMonth--;
    }

    elementByID('days').innerHTML = '';
    showCurrYear(currYear, currMonth);
    showCurrMonth(currYear, currMonth);
    // clearSelectDay();
}

showNamesOfWeek();