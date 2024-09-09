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
formSetTimer.addEventListener('submit', (e) => {
    e.preventDefault();
    if (setHour.value < 0 || setHour.value > 23 || setMinute.value < 0 || setMinute.value > 59 || setSecond.value < 0 || setSecond.value > 59) {
        notification('Por favor, ingrese una hora válida', true);
        return;
    }
    console.log('Formulario enviado');
});


// Cuando la hora actual sea igual a la hora del temporizador, se va a mostrar una alerta.
// Cada vez que se actualia la hora se tiene que comprar con la hora del temporizador.


// Fuctiones helpers

// Notificaciones
function notification(message, isAlert) {
    const alert = $('#alert');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('space-box');
    messageDiv.textContent = message;
    headingH1.insertAdjacentElement('afterend', messageDiv);

    if (isAlert) {
        messageDiv.classList.add('alert');

    } else {
        messageDiv.classList.add('notification');

    }

    if (alert) {
        alert.remove();
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
