const themeSwitch = document.querySelector('.btn-theme-switch');

themeSwitch.addEventListener('click', toggleThemeMenu);

function toggleThemeMenu() {
    const menu = document.querySelector('.theme-dropdown');
    
    document.body.addEventListener('click', selectThemeOrCloseMenu);
    menu.classList.toggle('display-flex');
}

function hiddMenu() {
    const menu = document.querySelector('.theme-dropdown');
    menu.classList.remove('display-flex');
}

function selectThemeOrCloseMenu(e) {
    const clk = e.target.className;
    const pattern = /^theme-choice-/
    
    if (clk === "btn btn-theme-switch") return;
    if (!clk.match(pattern)) {
        hiddMenu();
        return;
    }
    selectTheme(parseInt(clk.slice(13, 14)));
    hiddMenu();
}

function selectTheme(choice) {
    document.querySelector('.theme-dropdown > .hidden').classList.remove('hidden')
    document.querySelector('.theme-choice-' + choice).classList.add('hidden')


    document.body.classList.replace(document.body.classList[0], "theme-" + choice);


    fixAnimation();
    localStorage.setItem('todoAppTheme', choice);
}

function fixAnimation() {
    const btns = document.querySelectorAll('.theme-dropdown > button');
    const notHidden= document.querySelectorAll('.theme-dropdown > button:not(.hidden)')
    let i = 1;

    btns.forEach(element => {
        if (element.classList[1]) element.classList.remove(element.classList[1]);
    })

    notHidden.forEach(element => {
        element.classList.add('animation-' + i);
        i++;
    })
}


//Check Local Storage
if ((localStorage.todoAppTheme) && (localStorage.todoAppTheme !== "0")) selectTheme(parseInt(localStorage.todoAppTheme));
