//Selectors
const darkThemeToggle = document.querySelector(".btn-dark-switch");
const darkThemeIcon = darkThemeToggle.firstElementChild;

//Listeners
darkThemeToggle.addEventListener('click', toggleDarkTheme);

//Functions
function toggleDarkTheme() {
    document.body.classList.toggle("dark");
    darkThemeIcon.classList.toggle("fa-sun");
    
    localStorage.setItem("todoAppDark", (document.body.classList.contains("dark")) ? "dark" : "");
}

//If there is no value in local storage, use system preferences
if((localStorage.todoAppDark === undefined) && (window.matchMedia('(prefers-color-scheme: dark)'))) document.body.classList.add('dark');

//Fetching from local storage
if (localStorage.todoAppDark) document.body.classList.add('dark');

