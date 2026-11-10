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

    clearCompletedBtn.addEventListener('click', () => {
        todos = todos.filter(todo => !todo.completed);
        render();
    });

    function render(){
        todoList.innerHTML = '';
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
                    ${todo.completed ? '<svg xmlns="http://w3.org" width="11" height="9"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7 9.5 1"/></svg>' : ''}
                </div>
                <span class="todo-text">${todo.text}</span>
            </div>
            <button class="delete-btn" onclick="deleteTodo('${todo.id}')" aria-label="Delete item">
                <svg xmlns="http://w3.org" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.192 8.485l8.485 8.485-.707.708-8.485-8.485-8.485 8.485-.708-.707 8.485-8.485L0 .707.707 0l8.485 8.485L16.97 0z"/></svg>
            </button>
        `;
        todoList.appendChild(li);
        });

        const activeCount = todos.filter(todo => !todo.completed).length;
        itemsLeft.textContent = `${activeCount} item${activeCount === 1 ? '' : 's'} left`;
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(btn => btn.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            render();
        });
    });
});