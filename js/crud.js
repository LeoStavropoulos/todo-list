//Selectors
const insertBtn = document.querySelector('.btn-add');
const insertField = document.querySelector('.text-input');
const todoList = document.querySelector('.items-container');
const savedHTML = localStorage.todoAppStorage;
//Event Listeners
insertBtn.addEventListener('click', insertTodo);

//Check local storage
retrieveFromLocalStorage();
console.log(localStorage)
console.log(savedHTML)
/***** Functions ******/

//Insert a new todo
function insertTodo(e) {
    //Do not submit form
    e.preventDefault();
    
    //Selectors
    const todoText = insertField.value;
    const prototype = document.querySelector('#prototype');

    //check insert value and clear box after click
    if (todoText === '') return;
    insertField.value = '';

    //element cloning
    todoList.lastChild.after(prototype.cloneNode(true));
    const newTodo = todoList.lastChild;
    //Make element visible and add input text
    newTodo.removeAttribute('id');
    newTodo.children[1].innerHTML = todoText;

    //Select new todo's buttons
    const checkBtn = newTodo.firstElementChild
    const editBtn = newTodo.lastElementChild.firstElementChild
    const deleteBtn = newTodo.lastElementChild.lastElementChild

    //Add event listeners
    deleteBtn.addEventListener('click', deleteTodo);
    editBtn.addEventListener('click', editTodo);
    checkBtn.addEventListener('click', checkTodo);

    updateLocalStorage();
}

//Delete a todo
function deleteTodo(e) {
    const item = e.target.parentElement.parentElement;
        item.classList.add('delete-animation');
        setTimeout(function () {
            item.remove();
            updateLocalStorage();
        }, 250);
}

//Edit a todo
function editTodo(e) {
    const item = e.target.parentElement.parentElement;
        if (item.classList.contains('opacity50')) return;
        const todo = item.querySelector('.todo');
        todo.toggleAttribute('contenteditable')
        todo.focus();

        todo.addEventListener('focusout', function() {
            if(!todo.innerHTML){todo.innerHTML = ' '}
            todo.removeAttribute('contenteditable')
            updateLocalStorage();
        })
        
        todo.addEventListener('keypress', function(e) {
            if(!todo.innerHTML){todo.innerHTML = ' '}
            if (e.key !== 'Enter') return

            todo.removeAttribute('contenteditable')
            updateLocalStorage();
        })

}

//Check a todo
function checkTodo(e) {
    e.target.firstElementChild.classList.toggle('hidden');
    const item = e.target.parentElement;
    item.classList.toggle('opacity50');
    item.querySelector('.todo').classList.toggle('strike');

    updateLocalStorage();
}

//Retrieve form Local Storage and add Listeners

function retrieveFromLocalStorage() {
    if (!savedHTML) {return;}
    
    todoList.innerHTML = savedHTML;
    const items = todoList.querySelectorAll('.item')

    //Add event listeners to retrieved data
    items.forEach(item => {
        const checkBtn = item.firstElementChild
        const editBtn = item.lastElementChild.firstElementChild
        const deleteBtn = item.lastElementChild.lastElementChild

        deleteBtn.addEventListener('click', deleteTodo);
        editBtn.addEventListener('click', editTodo);
        checkBtn.addEventListener('click', checkTodo);
    });
}

//Update Local Storage
function updateLocalStorage() {localStorage.todoAppStorage = todoList.innerHTML}