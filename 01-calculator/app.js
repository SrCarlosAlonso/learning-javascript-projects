// Definir el alias $
const $ = (selector) => document.querySelector(selector);

let inputValores = $('#inputValores')

//Seleccionamos numeros
const num1 = $('#num1');
const num2 = $('#num2');
const num3 = $('#num3');
const num4 = $('#num4');
const num5 = $('#num5');
const num6 = $('#num6');
const num7 = $('#num7');
const num8 = $('#num8');
const num9 = $('#num9');
const num0 = $('#num0');

//Seleccionamos operadores
const suma = $('#sumaOp');
const resta = $('#restaOp');
const multiplicacion = $('#multiplicaOp');
const division = $('#divideOp');
const igual = $('#igualOp');

// Eventos
const numeros = [num1, num2, num3, num4, num5, num6, num7, num8, num9, num0];

numeros.forEach(numero => {
    numero.addEventListener('click', () => {
        inputValores.value += numero.value;
    })
});

// Operacione igual
const signos = [suma, resta, multiplicacion, division];

// Operaciones
let primerValor = '';
let segundoValor = '';
let operacionSigno = '';

// Eventos de los signos de operacion
signos.forEach(signo => {
    signo.addEventListener('click', () => {
        operacionSigno = signo.innerText;

        if (primerValor === '') {
            primerValor = inputValores.value;
            resetear();
        } else {
            resetear();
            segundoValor = inputValores.value;
            resultadoOperacion();
        }
    })
})
// Evento igual
igual.addEventListener('click', () => {
    if (primerValor !== '') {
        segundoValor = inputValores.value;
        resetear();
    } if (primerValor !== '' && segundoValor !== '') {
        resultadoOperacion();
    }
})

function resetear() {
    inputValores.value = '';
}

function resultadoOperacion() {
    let resultado = '';
    resultado = eval(`${primerValor} ${operacionSigno} ${segundoValor}`);

    if (resultado !== '' || segundoValor !== '') {

        inputValores.value = resultado;

        primerValor = resultado;
        operacionSigno = '';

        console.log(
            `
            Primer valor: ${primerValor} \n
            Segundo valor: ${segundoValor} \n
            Operacion: ${operacionSigno} \n
            Resultado: ${resultado}
            `
        )
    }

}