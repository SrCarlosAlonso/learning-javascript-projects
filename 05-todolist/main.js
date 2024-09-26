console.log("Hello World");

// DOM
const formTask = document.getElementById("form-task");
const inputTask = document.getElementById("input-task");
const btnSend = document.getElementById("btn-send");

const countAll = document.getElementById('count-all');
const countPending = document.getElementById('count-pending');
const countCompleted = document.getElementById('count-completed');

// Object taks empty
const tasksObject = [];

// Event Listeners
window.addEventListener('load', () => {
    let tasksLocal = localStorage.tasks ? JSON.parse(localStorage.tasks) : [];
    if (tasksLocal.length > 0) {
        tasksObject.push(...tasksLocal);
        return renderTasks(tasksObject);
    }
});

statusFilter();


formTask.addEventListener('submit', (e) => {
    e.preventDefault();

    if (inputTask.value === '') {
        showAlerte('error', 'Please, write a task');
        return;
    }

    const newTask = {
        title: inputTask.value,
        id: `id-${getRandomID()}`,
        date: new Date().toLocaleString(),
        completed: false
    }

    createTask(newTask);
    inputTask.value = '';
});


// Functions
const createTask = (task) => {
    const existingTask = tasksObject.find(t => t.id === taskEditID);

    if (existingTask) {
        const positionEdit = tasksObject.findIndex(task => task.id === taskEditID);
        tasksObject[positionEdit].title = task.title;
        taskEditID = null;
        showAlerte('notification', 'Task updated');
    } else {
        tasksObject.push(task);
        showAlerte('success', 'Task added');
    }
    renderTasks(tasksObject);
    toLocalStorage(tasksObject);
    statusFilter();

}


function renderTasks(tasksObject) {
    const ul = document.getElementById('list-tasks');
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }

    tasksObject.forEach((task) => {
        const { id, title, completed, date } = task;
        const li = document.createElement('li');
        li.id = id;
        li.classList.add('task');

        const img = document.createElement('img');
        img.classList.add('icon');
        img.dataset.id = id;
        // Change icon if task is completed
        if (task.completed) {
            img.src = '/public/icon-si-check.svg';
            li.classList.add('completed');
        } else {
            img.src = '/public/icon-pending.svg';
            li.classList.remove('completed');
        }
        img.onclick = () => { completedTask(task) };

        const p = document.createElement('p');
        p.classList.add('task-title');
        p.innerText = task.title;

        const actions = document.createElement('div');
        actions.id = 'actions-task';

        const buttonEdit = document.createElement('button');
        buttonEdit.type = 'button';
        buttonEdit.classList.add('button-edit');
        buttonEdit.onclick = () => { editTask(task) };
        buttonEdit.innerHTML = `
            <img src="/public/icon-edit.svg" alt="edit" width="18" height="15">
            `;

        const buttonDelete = document.createElement('button');
        buttonDelete.type = 'button';
        buttonDelete.classList.add('button-delete');
        buttonDelete.onclick = () => { deleteTask(task) };
        buttonDelete.innerHTML = `
            <img src="/public/icon-delete.svg" alt="delete" width="18" height="15">
            `;

        li.appendChild(img);
        li.appendChild(p);
        li.appendChild(actions);
        actions.appendChild(buttonEdit);
        actions.appendChild(buttonDelete);
        ul.appendChild(li);

    });
}

// Basic functions
function completedTask(task) {
    let { id, completed } = task;
    const iconCheck = document.querySelector(`[data-id="${id}"]`);
    const textTask = document.querySelector(`[data-id="${id}"]`).nextElementSibling;
    task.completed = !completed;

    if (task.completed) {
        iconCheck.src = '/public/icon-si-check.svg';
        textTask.classList.add('title-completed');

        // Si la task es completada tenemos que actulizar el objeto en local storage
        const index = tasksObject.findIndex((task) => task.id === id);
        tasksObject[index].completed = true;
        toLocalStorage(tasksObject);
        renderTasks(tasksObject);

        showAlerte('notification', 'Task completed');

    } else {
        iconCheck.src = '/public/icon-pending.svg';
        textTask.classList.remove('title-completed');

        const index = tasksObject.findIndex((task) => task.id === id);
        tasksObject[index].completed = false;
        toLocalStorage(tasksObject);
        renderTasks(tasksObject);
    }
}
let taskEditID = null;

function editTask(task) {
    console.log('Edit task', task);
    inputTask.value = task.title;
    taskEditID = task.id;
}

function deleteTask(task) {
    console.log('Delete task', task);
    const { id } = task;
    const index = tasksObject.findIndex((task) => task.id === id);
    tasksObject.splice(index, 1);
    renderTasks(tasksObject);
    toLocalStorage(tasksObject);
    showAlerte('success', 'Task deleted');

    statusFilter();
}

// Save to local storage
function toLocalStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Personalize
function statusFilter() {
    const allTasks = document.getElementById('count-all');
    const pendingTasks = document.getElementById('count-pending');
    const completedTasks = document.getElementById('count-completed');

    const taskFromLocal = localStorage.tasks ? JSON.parse(localStorage.tasks) : [];

    allTasks.innerText = taskFromLocal.length;
}
// Utils
function getRandomID() {
    const array = new Uint32Array(1);
    self.crypto.getRandomValues(array);
    return array[0].toString().slice(0, 4);
}

function showAlerte(type, message) {
    const existingAlerts = document.querySelectorAll('.alert');

    removeAlert(existingAlerts);

    const addBefore = document.querySelector('#app-list')
    const container = document.createElement('div');
    container.classList.add('alert', `alert-${type}`);
    const p = document.createElement('p');
    p.innerText = message;
    container.appendChild(p);
    addBefore.parentNode.insertBefore(container, addBefore);

    setTimeout(() => {
        container.remove();
        const remainingAlerts = document.querySelectorAll('.alert');

        if (remainingAlerts.length === 0) {
            container.classList.remove(`alert-${type}`);
            container.classList.add('alert', 'default');
            p.innerText = 'Some peace 🍝';
            container.appendChild(p);
            addBefore.parentNode.insertBefore(container, addBefore);
        }
    }, 1200);
}

function removeAlert(alert) {
    if (alert) {
        alert.forEach((alert) => {
            alert.remove();
        });
    }
}