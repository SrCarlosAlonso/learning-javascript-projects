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

//  Setear inputs del temporizador
function initialTimer(date) {
    setHour.value = date.getHours();
    setMinute.value = date.getMinutes();
    setSecond.value = date.getSeconds();
}

// Preventdefault al boton y cuando hagamos clic se ejecuta una funcion que guarda esos valores en una variable.
// Cuando la hora actual sea igual a la hora del temporizador, se va a mostrar una alerta.
// Cada vez que se actualia la hora se tiene que comprar con la hora del temporizador.