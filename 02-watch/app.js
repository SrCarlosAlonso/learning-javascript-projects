console.log('Hello, World!');

//Alias
const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);

// Listeners
document.addEventListener('DOMContentLoaded', () => {
    setDate(curentDate);
    updateClock();
    initialTimer(curentDate);

    setInterval(() => {
        updateClock();
    }, 1000);
});

// Obtenemos la fecha actual
const curentDate = new Date();

// Obtenemos los elementos del DOM
const day = $('#day');
const month = $('#month');
const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const year = $('#year');

const hours = $('#hours');
const minutes = $('#minutes');
const seconds = $('#seconds');

const setHour = $('#setHour');
const setMinute = $('#setMinute');
const setSecond = $('#setSecond');

const formSetTimer = $('#setAlarm');

const headingH1 = $('h1');

// Asignamos la fecha
function setDate(date) {
    day.innerText = date.getDate();
    month.innerText = monthNames[date.getMonth()];
    year.innerText = date.getFullYear();
}

// Actualizar el reloj
function updateClock() {
    const curentDate = new Date();

    const currentHours = curentDate.getHours();
    const currentMinutes = curentDate.getMinutes();
    const currentSeconds = curentDate.getSeconds();

    hours.innerText = currentHours;
    minutes.innerText = currentMinutes;
    seconds.innerText = currentSeconds;
};

//  Inicializar el temporizador
function initialTimer(date) {
    // Asignamos la hora actual a los inputs
    setHour.value = date.getHours();
    setMinute.value = date.getMinutes();
    setSecond.value = date.getSeconds();
    // Restringir la cantidad de caracteres en los inputs
    setHour.addEventListener('input', onlyTwoDigits);
    setMinute.addEventListener('input', onlyTwoDigits);
    setSecond.addEventListener('input', onlyTwoDigits);
}

// Validar el formulario del temporizador
let allTimers = [];

formSetTimer.addEventListener('submit', (e) => {
    e.preventDefault();
    if (setHour.value < 0 || setHour.value > 23 || setMinute.value < 0 || setMinute.value > 59 || setSecond.value < 0 || setSecond.value > 59) {
        notification('Por favor, ingrese una hora válida', true);
        return;
    }

    const timer = {
        hour: setHour.value,
        minute: setMinute.value,
        second: setSecond.value
    }
    allTimers.push(timer);

    saveTimer(allTimers);
});

// Mostrar los temporizadores guardados

function saveTimer(timer) {
    const resumeTimer = $('.resume-list')
    let idTimer = []
    resumeTimer.innerHTML = '';

    timer.forEach((timer, index) => {
        const { hour, minute, second } = timer;
        const timerId = `id-${hour}${minute}${second}`;

        // Verifica si ya existe el mismo ID en el array idTimer
        if (idTimer.some(id => id === timerId)) {
            console.log('Ya existe un timer con la misma hora');
            notification('Ya existe un timer con la misma hora', true);
            return;
        } else {
            const timerLi = document.createElement('li');
            timerLi.classList.add('resume-alarm');
            timerLi.id = timerId;
            timerLi.innerHTML = `
                    <p>Alarma ${index + 1}</p>
                    <span>${hour}:${minute}:${second}</span>
                    <button id:"borrar">X</button>
                `;
            resumeTimer.appendChild(timerLi);
            idTimer.push(timerId);
            notification('Temporizador guardado', false);

        }

    });
}

// -- Fuctiones helpers -- //
// Mostrar Notificaciones
function notification(message, isAlert) {
    // Buscar y eliminar cualquier notificación existente antes de crear una nueva
    const existingAlert = document.querySelector('#alert');
    if (existingAlert) {
        existingAlert.remove();
    }

    // Crear el nuevo elemento de mensaje
    const messageDiv = document.createElement('div');
    messageDiv.id = 'alert';
    messageDiv.classList.add('space-box');
    messageDiv.textContent = message;

    const headingH1 = document.querySelector('h1');
    headingH1.insertAdjacentElement('afterend', messageDiv);


    if (isAlert) {
        messageDiv.classList.add('alert');
    } else {
        messageDiv.classList.add('notification');
    }

    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}
// Solo 2 digitos en los inputs
function onlyTwoDigits(e) {
    if (e.target.value.length > 2) {
        e.target.value = e.target.value.slice(0, 2);
    }
}
