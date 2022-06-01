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
    const targetParentClass = e.target.parentElement.className;
    
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
        daysGrid.innerHTML += `<li class="prev-days">${prevLastDay - i + 1}</li>`;
    }
    
    //Creating currrent month's days
    for (let i = 1; i <= monthLastDay; i++) {
        
        // Selected day > today
        
        if ((i === today.getDate()) && (fullDate.getMonth() === today.getMonth()) && (fullDate.getFullYear() === today.getFullYear())) {
            daysGrid.innerHTML += `<li class="today">${i}</li>`;
        } else if ((i === pivotDate.getDate()) && (fullDate.getMonth() === pivotDate.getMonth()) && (fullDate.getFullYear() === pivotDate.getFullYear())) {
            daysGrid.innerHTML += `<li class="selected-day">${i}</li>`;
        } else {
            daysGrid.innerHTML += `<li>${i}</li>`;
        }
    }
    
    //Creating next month's days
    for (let i = 1; i <= missingDays; i++) {
        daysGrid.innerHTML += `<li class="next-days">${i}</li>`;
    }
    
    const daysGridElements = document.querySelectorAll('.days > li');
    
    
    //Adding event listeners
    daysGrid.addEventListener('click', skipToDate);

    //!Quickfix for having equally sized calendars
    const week = Math.ceil((monthFirstDay + monthLastDay) / 7)
    if ( week < 6) {
        for (let i = 1; i <= 7; i++) {
            daysGrid.innerHTML += `<li style='opacity: 0;' class='unclickable'>1</li>`;
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
    const month = fullDate.getMonth();
    const year = fullDate.getFullYear();
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    dateSelector.innerHTML = monthNames[month] + ' ' + year;
}

function skipToDate(e) {
    const className = e.target.className;
    const dateNumber = parseInt(e.target.innerHTML);

    switch (className) {
        case 'days':
            return;
        case 'prev-days':
            pivotDate.setFullYear(fullDate.getFullYear(), fullDate.getMonth() - 1);
            break;
        case 'next-days':
            pivotDate.setFullYear(fullDate.getFullYear(), fullDate.getMonth() + 1);
            break;
        default:
            pivotDate.setFullYear(fullDate.getFullYear(), fullDate.getMonth());
            break;
    }

    pivotDate.setDate(dateNumber);
    toggleCalendar();

}

