//Selectors
const headerTop = document.querySelector(".header > .top");
const div = document.createElement("div");

renderClock();

setInterval(() => {
    headerTop.firstElementChild.innerHTML = `<span>` + getformatedDate() + `</span> ` + `<span>` + getTime() + `</span>`;
}, 1000)



//Functions
function renderClock() {
    div.className = "clock";
    headerTop.prepend(div);

    headerTop.firstElementChild.innerHTML = `<span>` + getformatedDate() + `</span> ` + `<span>` + getTime() + `</span>`;
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