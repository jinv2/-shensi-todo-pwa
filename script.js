const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const taskList = document.getElementById('taskList');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.classList.toggle('completed', task.completed);
        li.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${index})">
            <span>${task.text}</span>
            <button onclick="deleteTask(${index})">删除</button>
        `;
        taskList.appendChild(li);
    });
}

function addTask() {
    const text = taskInput.value.trim();
    if (text) {
        tasks.push({ text, completed: false });
        taskInput.value = '';
        saveAndRender();
    }
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveAndRender();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveAndRender();
}

function saveAndRender() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

addButton.addEventListener('click', addTask);
taskInput.addEventListener('keypress', e => e.key === 'Enter' && addTask());
renderTasks();
