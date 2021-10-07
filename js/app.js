const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('.todo-input');
const todoItemsList = document.querySelector('.todo-items');

let todos = [];

todoForm.addEventListener('submit', function(event) {

    event.preventDefault();
    addTodo(todoInput.value);
});

function addTodo(item) {

    if(item !== '') {

        const todo = {
            id: Date.now(),
            name: item,
            completed: false
        };

        todos.push(todo);
        addToLocalStorage(todos);

        todoInput.value='';
    }
}

function renderTodos(todos) {
    todoItemsList.innerHTML='';
    todos.forEach(function(item) {

        const checked = item.completed ? 'checked' : null;

        const li = document.createElement('li');
        li.setAttribute('class', '"item list-group-item');
        li.setAttribute('data-key', item.id);

        if (item.completed===true) {
            li.classList.add('checked');
        }

        li.innerHTML= `
        <input class="checkbox" type="checkbox" ${checked}>
                  ${item.name}
                  <button type="button" class="btn-close delete-button" aria-label="Close"></button>
        `;

        todoItemsList.append(li);

    })
}

function addToLocalStorage(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos(todos);
}

function getFromLocalStorage() {
    const reference = localStorage.getItem('todos');
    if (reference) {
        todos = JSON.parse(reference);
        renderTodos(todos);
    }
}

getFromLocalStorage();

todoItemsList.addEventListener('click', function(event) {
if(event.target.type === 'checkbox') {
    toggle(event.target.parentElement.getAttribute('data-key'));
}

if(event.target.classList.contains('delete-button')) {

    deleteTodo(event.target.parentElement.getAttribute('data-key'));
}

});

function toggle(id) {
    todos.forEach(function(item){

        if (item.id==id) {

            item.completed=!item.completed;
        }
    }
    
    );

    addToLocalStorage(todos);
}

function deleteTodo(id) {

    todos = todos.filter(function(item){
        return item.id!=id;    
    });

    addToLocalStorage(todos);
}

var darkTheme=0;
function switchTheme(e) {

    
    if (darkTheme==0) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        darkTheme=1;
        document.querySelector('.bi-moon').classList.add('bi-moon-fill');
        document.querySelector('.bi-moon-fill').classList.remove('bi-moon');
        
    }
    else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        darkTheme=0; 
        document.querySelector('.bi-moon-fill').classList.add('bi-moon');
        document.querySelector('.bi-moon').classList.remove('bi-moon-fill');
    }    


}

toggleSwitch=document.getElementById('dark-mode-switch');
toggleSwitch.addEventListener('click', switchTheme, false);

const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (currentTheme === 'dark') {
        document.querySelector('.bi-moon').classList.add('bi-moon-fill');
        document.querySelector('.bi-moon-fill').classList.remove('bi-moon');
    }
}