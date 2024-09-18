//Alias
const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);

let count = 0;

// Cache the DOM
const counter = $('#counter');
const increment = $('#increment');
const decrement = $('#decrement');

increment.addEventListener('click', () => updateCounter(increment));
decrement.addEventListener('click', () => updateCounter());

function updateCounter(increment) {
    increment ? count++ : count--;
    counter.innerHTML = count;

    count === 0 ? decrement.disabled = true : decrement.disabled = false;
}