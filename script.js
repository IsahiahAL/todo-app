// Build a To-Do list without looking at a To-Do list tutorial. You can look up specific syntax (e.g., "how to create an HTML element in JS"), but do not look up "how to make a to-do list."
// The Twist (The Gap):
// Make the list remember your items even after you refresh the page.
// The Hint (Your Bridge):
// You will need to research a specific "container" in the Web API called localStorage.
// Why this is a worthwhile struggle:
// It forces you to learn JSON (how to turn an Array into a String and back again).
// It introduces the concept of State Persistence (data that lives longer than the session).
// It requires Event Handling (saving data every time a user adds an item).
//  In the future, use crypto.randomUUID() (since you like encryption!) or a counter variable. For a manual To-Do list, Date.now() is acceptable.

// local storage 
let todoListState = JSON.parse(localStorage.getItem('todos')) || [];


// select everything that we will use from the html
const ALERT = document.getElementById('alert');
const TODOFORM = document.getElementById('todo-form');
const TODOINPUT = document.getElementById('todo-input');
const TODOLIST = document.querySelector('ul');



function render(){
    console.log('rendered');
    TODOLIST.innerHTML = '';
    todoListState.forEach(todo => {
        const li = document.createElement('li');
        const span = document.createElement('span');
        const newEditBtn = document.createElement('button');
        const newDeleteBtn = document.createElement('button');

        newDeleteBtn.textContent = 'delete';
        newDeleteBtn.setAttribute('data-id', todo.id);
        newDeleteBtn.classList.add('delete');
        newEditBtn.textContent = 'edit';
        newEditBtn.setAttribute('data-id', todo.id);
        newEditBtn.classList.add('edit');

        span.textContent = todo.text;
        
        li.appendChild(span);
        li.appendChild(newEditBtn);
        li.appendChild(newDeleteBtn);


        TODOLIST.appendChild(li);
    });
};

function addTodo(e){
    e.preventDefault();
    if (TODOINPUT.value.trim() === '') {
        return;
    }
    const newTodoObj = {
        id: Date.now(),
        text: TODOINPUT.value,
        isCompleted: false
    };

    todoListState.push(newTodoObj);

    localStorage.setItem('todos', JSON.stringify(todoListState));

    render();

    TODOINPUT.value = '';
}

function deleteEditSave(e){
    const item = e.target;
    const idToDelete = Number(item.getAttribute('data-id'));
    if(item.classList.contains('delete')){
        

        todoListState = todoListState.filter(todo => todo.id !== idToDelete);

        localStorage.setItem('todos', JSON.stringify(todoListState));

        render();
    }
    if(item.classList.contains('edit')){
            edit(item);
            return;
    }
    if(item.classList.contains('save')){
        save(item);
        return;
    }

};


function edit(item){
        item.textContent = 'save';
        item.parentElement.firstChild.contentEditable = "true";
        item.parentElement.firstChild.focus();
        // cursor placement
        const range = document.createRange();
        range.selectNodeContents(item.parentElement.firstChild)
        range.collapse();
         const selection = window.getSelection(range);
        selection.removeAllRanges(range);
        selection.addRange(range);
        // persisting to local storage
        item.classList.remove('edit');
        item.classList.add('save');
      
        // render();
}
function save(item){
        item.parentElement.firstChild.blur();
        item.parentElement.firstChild.contentEditable = "false";
        item.classList.remove('save');
        item.textContent = 'edit';
        item.classList.add('edit');
        const saveBtnId =  Number(item.getAttribute('data-id'));
        const savedText = item.parentElement.firstChild.textContent;
        const index = todoListState.findIndex(todo => todo.id === saveBtnId);
        if(index !== -1){
            todoListState[index].text = savedText;
        }
        localStorage.setItem('todos', JSON.stringify(todoListState));
        render();

}

render();


TODOFORM.addEventListener('submit', addTodo);
TODOLIST.addEventListener('click', deleteEditSave);
