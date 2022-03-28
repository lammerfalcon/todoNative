document.addEventListener('DOMContentLoaded', () =>{
    const ref = localStorage.getItem('todo')
    if (ref){
        todoItems = JSON.parse(ref)
        todoItems.forEach(t => {
            renderTodo(t)
        })
    }
})
const input = document.querySelector('.input')
let todoItems = [];

function addTodo(text) {
    const todo = {
        text,
        checked: false,
        id: Date.now(),
    }
    todoItems.push(todo)
    renderTodo(todo);
}

const form = document.querySelector('.form-group')
form.addEventListener('submit', event => {
    event.preventDefault()
    const text = input.value.trim()
    if (text !== '') {
        addTodo(text)
        input.value = ''
        input.focus()
    }

})

function renderTodo(todo) {
    if (todoItems.length >= 10) {
        input.disabled = true;
        input.placeholder = "May be enough?"
    } else {
        input.disabled = false;
        input.placeholder = "Add task"

    }
    localStorage.setItem('todo', JSON.stringify(todoItems))
    if (todoItems.length === 0) {
        const list = document.querySelector('.list')
        list.innerHTML = ''
        return;
    }

    const list = document.querySelector('.list')
    const item = document.querySelector(`[data-key='${todo.id}']`)
    if (todo.deleted) {
        item.remove();
        return
    }
    const isChecked = todo.checked ? 'done': ''
    const node = document.createElement("li")
    node.setAttribute('class', `todo-item ${isChecked}`)
    node.setAttribute('data-key', todo.id)
    node.innerHTML = `
        <label for="${todo.id}" class="tick js-tick">
        <input id="${todo.id}" type="checkbox"/>
        </label>
        
        
        <span>${todo.text}</span>
        
    <button class="btn delete-todo js-delete-todo">
    <i class="fas fa-trash-alt"></i>
    </button>
  `
        if (item) {
            list.replaceChild(node, item)
        } else {
            list.append(node)
        }
}

const list = document.querySelector('.list')
list.addEventListener('click', event => {
    if (event.target.classList.contains('js-tick')) {
        const itemKey = event.target.parentElement.dataset.key
        toggleDone(itemKey)
    }
    if (event.target.classList.contains('js-delete-todo')) {

        const itemKey = event.target.parentElement.dataset.key
        deleteTodo(itemKey)
    }
})

function deleteTodo(key) {
    const index = todoItems.findIndex(item => item.id === Number(key))
    const todo = {
        deleted: true,
        ...todoItems[index]
    }
    todoItems = todoItems.filter(item => item.id !== Number(key))
    renderTodo(todo)
}

function toggleDone(key) {
    const index = todoItems.findIndex(item => item.id === Number(key))
    todoItems[index].checked = !todoItems[index].checked
    renderTodo(todoItems[index])
}

function clearAll() {
    const input = document.querySelector('.input')
    input.value = ''
    todoItems.length = 0
    renderTodo()
}

const bg = document.querySelector('.bg');
const windowWidth = window.innerWidth / 5;
const windowHeight = window.innerHeight / 5 ;
const container = document.querySelector('body')
container.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / windowWidth;
    const mouseY = e.clientY / windowHeight;

    bg.style.transform = `translate3d(-${mouseX}%, -${mouseY}%, 0)`;
});