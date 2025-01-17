const minusBtns = document.querySelectorAll('.minus');
const plusBtns = document.querySelectorAll('.plus');
const counters = document.querySelectorAll('.counter');
const btnUp = document.querySelector('#show-btn');
const menu = document.querySelector('#pass');
const btnLower = document.querySelector('#btn-lower');

menu.style.display = 'none'

let isDisplay = false;

btnUp.addEventListener('click', () => {
    showWindowPassengers();
})

btnLower.addEventListener('click', () => {
    menu.style.display = 'none'
    isDisplay = !isDisplay;
})

function showWindowPassengers() {
    if(isDisplay) {
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
    if(allNumberPassengers >= 9 && isPlus) {
        return true;
    }
    return false;
}