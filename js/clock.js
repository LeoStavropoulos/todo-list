//Selectors
const headerTop = document.querySelector(".header > .top");
const div = document.createElement("div");

div.className = "clock";
headerTop.prepend(div);
renderClock();

let clockInterval = setInterval(renderClock, 1000);



//Functions
function renderClock() {
    headerTop.firstElementChild.innerHTML = `<span>${getformatedDate()}</span> <button class="btn btn-off"><i class="fas fa-power-off"></i></button> <span>${getTime()}</span>`;
    document.querySelector(".btn-off").addEventListener('click', toggleClock)
}


function getformatedDate() {
    const fullDate = new Date();
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

    return date.slice(0, 3) + ',' + date.slice(3, 8) + parseInt(date.slice(8, 10)) + suffix;

}

function getTime() {
    const fullDate = new Date();
    return fullDate.toTimeString().slice(0,8);
}

function toggleClock(e) {
    const clock = document.querySelector(".clock");
    clock.classList.toggle("clock-off")
    clock.firstElementChild.classList.toggle("opacity0");
    clock.lastElementChild.classList.toggle("opacity0");

    replaceClockIcon(e); 
    pauseRestartClock(clock);
}

function replaceClockIcon(e) {
    const btn = e.target.firstElementChild;

    if (btn.className === "fas fa-power-off") {
        btn.classList.replace("fa-power-off", "fa-clock");
        return;
    } 

    btn.classList.replace("fa-clock", "fa-power-off");
}

function pauseRestartClock(clock) {
    if (clock.classList.contains("clock-off")) {
        clearInterval(clockInterval);
        return;
    }

    renderClock();
    clockInterval = setInterval(renderClock, 1000);
}