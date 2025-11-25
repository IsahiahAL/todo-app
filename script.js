// Build a To-Do list without looking at a To-Do list tutorial. You can look up specific syntax (e.g., "how to create an HTML element in JS"), but do not look up "how to make a to-do list."
// The Twist (The Gap):
// Make the list remember your items even after you refresh the page.
// The Hint (Your Bridge):
// You will need to research a specific "container" in the Web API called localStorage.
// Why this is a worthwhile struggle:
// It forces you to learn JSON (how to turn an Array into a String and back again).
// It introduces the concept of State Persistence (data that lives longer than the session).
// It requires Event Handling (saving data every time a user adds an item).

// local storage 
let updateTodo = JSON.parse(localStorage.getItem('todos')) || [];


// select everything that we will use from the html
const ALERT = document.getElementById('alert');
const TODOFORM = document.getElementById('todo-form');
const TODOINPUT = document.getElementById('todo-input');
const TODOLIST = document.getElementById('todo-list');
const editBtn = document.getElementsByClassName('edit');
const deleteBtn = document.getElementsByClassName('delete');
const saveBtn = document.getElementsByClassName('save');

displayTodos();

function displayTodos(){
    if(updateTodo){
        updateTodo.forEach(element => {
            const li = document.createElement('li');
            const span = document.createElement('span');
            span.setAttribute('autocomplete', 'off');
            const newEditBtn = document.createElement('button');
            const newDeleteBtn = document.createElement('button');
            span.textContent=  element;
            span.classList.add('todo');
            span.contentEditable = 'true';
            newEditBtn.textContent = 'edit';
            newEditBtn.classList.add('edit');
            newDeleteBtn.textContent = 'delete';
            newDeleteBtn.classList.add('delete');
            li.appendChild(span);
            li.appendChild(newEditBtn);
            li.appendChild(newDeleteBtn);
            TODOLIST.appendChild(li);
        });
    }
}



// removing auto complete from the form
TODOFORM.setAttribute('autocomplete', 'off');



// check to see if input field is empty
function checkForEmptyString(e){
    e.preventDefault();
    if(e.target === TODOFORM && TODOINPUT.value == ''){
        ALERT.classList.remove('alert');
    }else if(e.target === TODOFORM && TODOINPUT.value !== ''){
        ALERT.classList.add('alert');
        createTodo();
    }
}
// create a new todo
function createTodo(e){
    updateTodo.push(TODOINPUT.value);
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.setAttribute('autocomplete', 'off');
    const newEditBtn = document.createElement('button');
    const newDeleteBtn = document.createElement('button');
    span.textContent=  TODOINPUT.value;
    span.classList.add('todo');
    span.contentEditable = 'true';
    newEditBtn.textContent = 'edit';
    newEditBtn.classList.add('edit');
    newDeleteBtn.textContent = 'delete';
    newDeleteBtn.classList.add('delete');
    li.appendChild(span);
    li.appendChild(newEditBtn);
    li.appendChild(newDeleteBtn);
    TODOLIST.appendChild(li);
    TODOINPUT.value = '';
    localStorage.setItem('todos', JSON.stringify(updateTodo));
}

// check to see what was clicked
function classCheck(e){
    if(e.target.classList.contains('edit')){
        editTodo(e);
    }
    else if(e.target.classList.contains('save')){
        saveTodo(e);
    }
    else if(e.target.classList.contains('delete')){
        deleteTodo(e);
    }
}


// edit todo
function editTodo(e){
        e.target.parentElement.firstChild.focus;
        const range = document.createRange();
        range.selectNodeContents(e.target.parentElement.firstChild);
        range.collapse();
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        e.target.textContent = 'save';
        e.target.classList.add('save');
        e.target.classList.remove('edit');
}

// save todo
function saveTodo(e){
    if(e.target.parentElement.firstChild.textContent == ''){
      ALERT.classList.remove('alert');
      e.target.parentElement.firstChild.focus();
    } else{
        const whitsSpace = e.target.parentElement.firstChild.textContent.trim();
        e.target.parentElement.firstChild.textContent = whitsSpace;
        e.target.parentElement.firstChild.blur();
        e.target.textContent = 'edit';
        e.target.classList.remove('save');
        e.target.classList.add('edit');
    }
}
// delete todo
function deleteTodo(e){
        e.target.parentElement.remove();
}



// Event listeners
TODOFORM.addEventListener('submit', checkForEmptyString);
document.addEventListener('click', classCheck);
