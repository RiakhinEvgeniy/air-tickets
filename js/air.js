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

btnClearCalendar.addEventListener('click', () => {
    clearSelectDay();
})

function showWindowCalendar() {
    if (isDisplayCalendar) {
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

    if (clickedDays.length && +day.textContent < +clickedDays[0].textContent) {
        return
    }

    clickedDays.push(day);

    if (counterClickedDays === 1) {
        let firstClickedDay = allDaysOfMonth.indexOf(clickedDays[0]);
        let lastClickedDay = allDaysOfMonth.indexOf(clickedDays[1]);
        daysSelecteBetweendDays = allDaysOfMonth.slice(firstClickedDay + 1, lastClickedDay);
        daysSelecteBetweendDays.forEach(item => { item.style.backgroundColor = 'red' });
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
// block for passengers
const minusBtns = document.querySelectorAll('.minus');
const plusBtns = document.querySelectorAll('.plus');
const counters = document.querySelectorAll('.counter');
const btnUp = document.querySelector('#show-btn');
const menu = document.querySelector('#pass');
const btnLower = document.querySelector('#btn-close-pass');
const input4 = document.querySelector('#input4');


menu.style.display = 'none'

let isDisplay = false;
let amountAllPassengers = 0;

input4.addEventListener('focus', () => {
    showWindowPassengers();
})

// input4.addEventListener('blur', () => {
//     menu.style.display = 'none'
//     isDisplay = !isDisplay;
//     input4.value = amountAllPassengers;
// })

btnLower.addEventListener('click', () => {
    menu.style.display = 'none'
    isDisplay = !isDisplay;
    amountAllPassengers = Object.values(passenger).reduce((acc, num) => acc + num);
    if(amountAllPassengers) {
        input4.value = `Количество пассажиров: ${amountAllPassengers}`;
    }
})

function showWindowPassengers() {
    if (isDisplay) {
        menu.style.display = 'none'
    } else {
        menu.style.display = 'block'
    }

    isDisplay = !isDisplay;
}

minusBtns.forEach((btn) => {
    changeCounter(btn, 'minus');
});

plusBtns.forEach((btn) => {
    changeCounter(btn, 'plus');
});

const passenger = {
    adult: 0,
    child: 0,
    baby: 0
}

function changeCounter(btn, sign) {
    let isPlus = true;
    if (sign === 'minus') {
        isPlus = false;
    }

    btn.addEventListener('click', () => {

        const id = +btn.dataset.id;
        switch (id) {
            case 0:

                if (checkingNumberOfPassengers('adult', isPlus)) return
                if (totalNumberPassengers(isPlus)) return

                isPlus ? passenger.adult++ : passenger.adult--;
                counters[id].textContent = passenger.adult;
                break;
            case 1:

                if (checkingNumberOfPassengers('child', isPlus)) return
                if (totalNumberPassengers(isPlus)) return

                isPlus ? passenger.child++ : passenger.child--;
                counters[id].textContent = passenger.child;
                break;
            case 2:

                if (checkingNumberOfPassengers('baby', isPlus)) return
                if (totalNumberPassengers(isPlus)) return

                isPlus ? passenger.baby++ : passenger.baby--;
                counters[id].textContent = passenger.baby;
                break;
            default:
                break;
        }
    })
}

function checkingNumberOfPassengers(key, isPlus) {
    if (passenger[key] === 0 && !isPlus) {
        return true;
    }
    return false;
}

function totalNumberPassengers(isPlus) {
    let allNumberPassengers = Object.values(passenger).reduce((acc, num) => acc + num);
    if (allNumberPassengers >= 9 && isPlus) {
        return true;
    }
    return false;
}