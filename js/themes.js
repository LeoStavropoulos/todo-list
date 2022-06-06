const themeSwitch = document.querySelector('.btn-theme-switch');

themeSwitch.addEventListener('click', toggleThemeMenu);

function toggleThemeMenu() {
    const menu = document.querySelector('.theme-dropdown');
    
    document.body.addEventListener('click', selectThemeOrCloseMenu);
    menu.classList.toggle('display-flex');
}

function hiddeMenu() {
    const menu = document.querySelector('.theme-dropdown');
    menu.classList.remove('display-flex');
}

function selectThemeOrCloseMenu(e) {
    const clk = e.target.className;
    const pattern = /^theme-choice-/
    
    if (clk === "btn btn-theme-switch") return;
    if (!clk.match(pattern)) {
        hiddeMenu();
        return;
    }
    selectTheme(parseInt(clk.slice(13, 14)));
    hiddeMenu();
}

function selectTheme(choice) {

    document.querySelector('.theme-dropdown > .hidden').classList.remove('hidden')
    document.querySelector('.theme-choice-' + choice).classList.add('hidden')
    switch (choice) {
        case 0: 
            document.documentElement.style.setProperty('--accent-color', '#C57B02')
            document.documentElement.style.setProperty('--secondary-dark-color', '#E4B98D')
            document.documentElement.style.setProperty('--secondary-light-color', '#FFEBCC')
            document.documentElement.style.setProperty('--light-text-color', '#FFEBCC')
            document.documentElement.style.setProperty('--light-text-shadow-color', '#C57B02')
            document.documentElement.style.setProperty('--dt-accent-color', '#c4ac86')
            document.documentElement.style.setProperty('--dt-secondary-light-color', '#7a654e')
            document.documentElement.style.setProperty('--dt-secondary-dark-color', '#120c01')
            break;
        case 1:
            document.documentElement.style.setProperty('--accent-color', '#609C88')
            document.documentElement.style.setProperty('--secondary-dark-color', '#376c5f')
            document.documentElement.style.setProperty('--secondary-light-color', '#D9EDDF')
            document.documentElement.style.setProperty('--light-text-color', '#D9EDDF')
            document.documentElement.style.setProperty('--light-text-shadow-color', '#609C88')
            document.documentElement.style.setProperty('--dt-accent-color', '#D9EDDF')
            document.documentElement.style.setProperty('--dt-secondary-light-color', '#121813')
            document.documentElement.style.setProperty('--dt-secondary-dark-color', '#6b8a71')
            break;
        case 2:
            document.documentElement.style.setProperty('--accent-color', '#4A68EA')
            document.documentElement.style.setProperty('--secondary-dark-color', '#7588FF')
            document.documentElement.style.setProperty('--secondary-light-color', '#F9F8FF')
            document.documentElement.style.setProperty('--light-text-color', '#F9F8FF')
            document.documentElement.style.setProperty('--light-text-shadow-color', '#4A68EA')
            document.documentElement.style.setProperty('--dt-accent-color', '#b2bbea')
            document.documentElement.style.setProperty('--dt-secondary-light-color', '#00082a')
            document.documentElement.style.setProperty('--dt-secondary-dark-color', '#5863a9')
            break;
        case 3:
            document.documentElement.style.setProperty('--accent-color', '#FF60B6')
            document.documentElement.style.setProperty('--secondary-dark-color', '#D8BFD8')
            document.documentElement.style.setProperty('--secondary-light-color', '#FFF4FC')
            document.documentElement.style.setProperty('--light-text-color', '#FFF4FC')
            document.documentElement.style.setProperty('--light-text-shadow-color', '#FF60B6')
            document.documentElement.style.setProperty('--dt-accent-color', '#FFF4FC')
            document.documentElement.style.setProperty('--dt-secondary-light-color', '#5D4763')
            document.documentElement.style.setProperty('--dt-secondary-dark-color', '#9773A1')
            break;
        case 4:
            document.documentElement.style.setProperty('--accent-color', '#B10A27')
            document.documentElement.style.setProperty('--secondary-dark-color', '#BC827D')
            document.documentElement.style.setProperty('--secondary-light-color', '#FFF3F0')
            document.documentElement.style.setProperty('--light-text-color', '#FFF3F0')
            document.documentElement.style.setProperty('--light-text-shadow-color', '#B10A27')
            document.documentElement.style.setProperty('--dt-accent-color', '#FFF3F0')
            document.documentElement.style.setProperty('--dt-secondary-light-color', '#2D1B1D')
            document.documentElement.style.setProperty('--dt-secondary-dark-color', '#BC827D')
            break;
        default:
            break;    
    }
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
