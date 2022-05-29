//Selectors
const insertBtn = document.querySelector('.btn-add');
const insertField = document.querySelector('.text-input');

//Event Listeners
insertBtn.addEventListener('click', insertTodo)

//Functions

//Insert a new todo
function insertTodo() {
    //Selectors
    const todoList = document.querySelector('.items-container');
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

}

//Delete a todo
function deleteTodo(e) {
    const item = e.target.parentElement.parentElement;
        item.classList.add('delete-animation');
        setTimeout(function () {item.remove()}, 250);
}

//Edit a todo
function editTodo(e) {
    const item = e.target.parentElement.parentElement;
        if (item.classList.contains('opacity50')) return;
        const todo = item.querySelector('.todo');
        todo.toggleAttribute('contenteditable')
        todo.focus();

        todo.addEventListener('focusout', function() {
            todo.removeAttribute('contenteditable')
        })
}

//Check a todo
function checkTodo(e) {
    e.target.firstElementChild.classList.toggle('hidden');
    const item = e.target.parentElement;
    item.classList.toggle('opacity50');
    item.querySelector('.todo').classList.toggle('strike');
}