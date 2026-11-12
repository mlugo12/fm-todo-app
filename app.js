let todos = [];
let currentFilter = 'all';

const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const todoCount = document.getElementById('todo-count');
const clearCompletedBtn = document.getElementById('clear-completed');
const themeToggleBtn = document.getElementById('theme-toggle');
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');
const filterBtns = document.querySelectorAll('.filter-btn');

themeToggleBtn.addEventListener('click', () => {
  const isDark = document.documentElement.classList.toggle('dark');
  if (isDark) {
    moonIcon.classList.remove('hidden');
    sunIcon.classList.add('hidden');
  } else {
    moonIcon.classList.add('hidden');
    sunIcon.classList.remove('hidden');
  }
});



function toggleTodo(id) {
    todos = todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    render();
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    render();
}

//the render function
function render(){
    todoList.innerHTML = '';
    clearCompletedBtn.classList.toggle('hidden', todos.length === 0);

    const filteredTodos = todos.filter(todo => {
        if (currentFilter === 'active') return !todo.completed;
        if (currentFilter === 'completed') return todo.completed;
        return true;
    });

    filteredTodos.forEach(todo => {
        const li = document.createElement('li');
        if (todo.completed) li.classList.add('completed');

        li.innerHTML = `
            <div class="todo-item-left" onclick="toggleTodo('${todo.id}')">
                <div class="checkbox">
                    ${todo.completed ? '<img src="./images/icon-check.svg" alt="Completed">' : ''}
                </div>
                <span class="todo-text">${todo.text}</span>
            </div>
            
            <button class="delete-btn" onclick="deleteTodo('${todo.id}')" aria-label="Delete item">
                <img src="./images/icon-cross.svg" alt="Delete item">
            </button>
        `;
    todoList.appendChild(li);
    });

    const activeCount = todos.filter(todo => !todo.completed).length;
    todoCount.textContent = `${activeCount} item${activeCount === 1 ? '' : 's'} left`;
}

//listener for adding a new todo
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = todoInput.value.trim();   
    if (!text) return;

    const newTodo = {
        id: crypto.randomUUID(),
        text: text,
        completed: false
    };

    todos.push(newTodo);
    todoInput.value = '';
    render();

    clearCompletedBtn.addEventListener('click', () => {
        todos = todos.filter(todo => !todo.completed);
        render();
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(btn => btn.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            render();
        });
    });
});