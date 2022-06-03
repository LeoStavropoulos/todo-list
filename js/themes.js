//Selectors
const darkThemeToggle = document.querySelector(".btn-dark-switch");
const darkThemeIcon = darkThemeToggle.firstElementChild;
const body = document.body;

//Listeners
darkThemeToggle.addEventListener('click', toggleDarkTheme);

//Functions
function toggleDarkTheme() {
    body.classList.toggle("dark-theme");
    darkThemeIcon.classList.toggle("fa-sun");
    localStorage.setItem("todoAppTheme", body.className)
}

//If there is no value in local storage, use system preferences
if((localStorage.todoAppTheme === undefined) && (window.matchMedia('(prefers-color-scheme: dark)'))) body.classList.add('dark-theme');

//Fetching from local storage
if (localStorage.todoAppTheme) body.classList.add('dark-theme');

