//Imports
import { retrieveFromLocalStorage } from './crud.js';

//Selectors
export const fullDate = new Date(); //current date, but it changes in renderCaldendar
const today = new Date(); //current date that stays unchanged 
const pivotDate = new Date();  //points to the selected date before openning the calendar

const nextBtn = document.querySelector('.btn-right');
const prevBtn = document.querySelector('.btn-left');
const dateSelector = document.querySelector('.selector>.date');
const calendarDialog = document.querySelector('.calendar');
const todoItemsContainer = document.querySelector('.list');
const inputForm = document.querySelector('.form');
const container = document.querySelector('.container');

addformatedDate();


//Listeners
nextBtn.addEventListener('click', function() {
    const month = fullDate.getMonth();
    const day = fullDate.getDate();

    if(calendarDialog.getAttribute('open') === null) {
        fullDate.setDate(day + 1);
        addformatedDate();
        retrieveFromLocalStorage();
        return;
    }
    
    fullDate.setMonth(month + 1, 1);
    addFormatedMonth();
    renderCalendar();
})

prevBtn.addEventListener('click', function() {
    const month = fullDate.getMonth();
    const day = fullDate.getDate();

    if(calendarDialog.getAttribute('open') === null) {
        fullDate.setDate(day - 1);
        addformatedDate();
        retrieveFromLocalStorage();
        return;
    }
    
    fullDate.setMonth(month - 1, 1);
    addFormatedMonth();
    renderCalendar();
})

dateSelector.addEventListener('click', toggleCalendar);

container.addEventListener('click', function(e) {
    let targetParentClass;
    if (e.target.parentElement === null) {
        targetParentClass = null;
    } else {
        targetParentClass = e.target.parentElement.className;
    }
    
    if ((targetParentClass === 'days') || (targetParentClass === 'selector') || (targetParentClass === 'btn btn-right') || (targetParentClass === 'btn btn-left') || (calendarDialog.getAttribute('open') === null)) return;
    toggleCalendar();
    // weekdays
    // calendar
})


//Functions

function renderCalendar() {
    const monthLastDay = new Date(fullDate.getFullYear(), fullDate.getMonth() + 1, 0).getDate();
    const prevLastDay = new Date(fullDate.getFullYear(), fullDate.getMonth(), 0).getDate();
    const monthFirstDay = new Date(fullDate.getFullYear(), fullDate.getMonth(), 1).getDay();
    
    //Fill calendar with days till completing current week
    const missingDays = (7 * Math.ceil((monthFirstDay + monthLastDay) / 7)) - monthFirstDay - monthLastDay;

    const daysGrid = document.querySelector('.days');
    daysGrid.innerHTML = '';

    //Creating days of previous month
    for (let i = monthFirstDay; i > 0; i--) {
        daysGrid.innerHTML += `<li class="prev-days"><span>${prevLastDay - i + 1}</span><span class="opacity0">&#8226;</span></li>`;
    }
    
    //Creating currrent month's days
    for (let i = 1; i <= monthLastDay; i++) {
        
        // Selected day < today
        
        if ((i === today.getDate()) && (fullDate.getMonth() === today.getMonth()) && (fullDate.getFullYear() === today.getFullYear())) {
            daysGrid.innerHTML += `<li class="today"><span>${i}</span><span class="opacity0">&#8226;</span></li>`;
        } else if ((i === pivotDate.getDate()) && (fullDate.getMonth() === pivotDate.getMonth()) && (fullDate.getFullYear() === pivotDate.getFullYear())) {
            daysGrid.innerHTML += `<li class="selected-day"><span>${i}</span><span class="opacity0">&#8226;</span></li>`;
        } else {
            daysGrid.innerHTML += `<li><span>${i}</span><span class="opacity0">&#8226;</span></li>`;
        }
    }
    
    //Creating next month's days
    for (let i = 1; i <= missingDays; i++) {
        daysGrid.innerHTML += `<li class="next-days"><span>${i}</span><span class="opacity0">&#8226;</span></li>`;
    }

    //Add marks on calendar
    markUnfinishedOnCalendar(daysGrid, fullDate);

    //Adding event listeners
    daysGrid.addEventListener('click', skipToDate);

    //!Quickfix for having equally sized calendars
    const week = Math.ceil((monthFirstDay + monthLastDay) / 7)
    if ( week < 6) {
        for (let i = 1; i <= 7; i++) {
            daysGrid.innerHTML += `<li style='opacity: 0;' class='unclickable'><span>0</span></span><span>&#8226;</span></li>`;
        }
    }
}

function toggleCalendar() {
    calendarDialog.toggleAttribute('open'); 
    
    todoItemsContainer.classList.toggle('blured');
    todoItemsContainer.classList.toggle('unclickable');
    inputForm.classList.toggle('blured');
    inputForm.classList.toggle('unclickable');
    
    if(calendarDialog.getAttribute('open') === null) {
        fullDate.setFullYear(pivotDate.getFullYear(), pivotDate.getMonth(), pivotDate.getDate());
        addformatedDate();
        retrieveFromLocalStorage();
        return;
    }
    
    pivotDate.setFullYear(fullDate.getFullYear(), fullDate.getMonth(), fullDate.getDate());
    addFormatedMonth();
    renderCalendar();
}


function addformatedDate() {
    const date = fullDate.toDateString();
    const dayNum = fullDate.getDate();
    let suffix; 

    switch (dayNum) {
        case 1:
        case 21:
        case 31:
            suffix = 'st'
            break;
        case 2:
        case 22:
            suffix = 'nd'
            break;
        case 3:
        case 23:
            suffix = 'rd'
            break;
        default:
            suffix = 'th'
            break;
    }

    dateSelector.innerHTML = date.slice(0, 3) + ',' + date.slice(3, 8) + parseInt(date.slice(8, 10)) + suffix + date.slice(10);

}

function addFormatedMonth() {
    dateSelector.innerHTML = fullDate.toLocaleDateString('en-US', {month: 'long', year: 'numeric'})
}

function skipToDate(e) {
    const className = e.target.className;
    const dateNumber = parseInt(e.target.firstElementChild.innerHTML);

    switch (className) {
        case 'days':
            return;
        case 'prev-days':
            pivotDate.setFullYear(fullDate.getFullYear(), fullDate.getMonth() - 1, 1);
            break;
        case 'next-days':
            pivotDate.setFullYear(fullDate.getFullYear(), fullDate.getMonth() + 1, 1);
            break;
        default:
            pivotDate.setFullYear(fullDate.getFullYear(), fullDate.getMonth(), 1);
            break;
    }

    pivotDate.setDate(dateNumber);
    toggleCalendar();

}

function markUnfinishedOnCalendar(daysGrid, shownDate) {
    const daysGridElements = daysGrid.querySelectorAll('.days > li > .opacity0');
    const currentMonth = shownDate.getMonth();
    const prevMonth = shownDate.getMonth() - 1;
    const nextMonth = shownDate.getMonth() + 1;
    const lastDay = new Date(shownDate.getFullYear(), nextMonth, 0).getDate() //currrent month's last day

    let i = 0;

    //Checking previous month's days
    while (daysGridElements[i].previousElementSibling.innerHTML > 1) {
        const dateString = new Date(shownDate.getFullYear(), prevMonth, daysGridElements[i].previousElementSibling.innerHTML).toDateString()
        showIfUnfinished(dateString, daysGridElements[i]);
        i++
    }
    
    //Checking current month's days
    while (i <= lastDay) {
        const dateString = new Date(shownDate.getFullYear(), currentMonth, daysGridElements[i].previousElementSibling.innerHTML).toDateString()
        showIfUnfinished(dateString, daysGridElements[i]);
        i++
    }
    //Checking next month's days
    while (daysGridElements[i]) {
        const dateString = new Date(shownDate.getFullYear(), nextMonth, daysGridElements[i].previousElementSibling.innerHTML).toDateString()
        showIfUnfinished(dateString, daysGridElements[i]);
        i++
    }
}

function showIfUnfinished(date, element) {
    const key = "todoAppStorage " + date;
    if (!(localStorage[key])) return;
    
    const obj = document.createElement('html')
    obj.innerHTML = localStorage[key]

    if (obj.querySelectorAll('.fa-check.hidden').length < 2) return;
    
    element.classList.remove('opacity0');
}
