/*
 * Game
 */

let deck = [];
const types = ['C', 'D', 'H', 'S'];
const specials = ['A', 'J', 'Q', 'K'];

//Suffle the deck
const shuffleDeck = function (array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Creat a dinamic deck from srach
const createDeck = () => {
    for (let i = 2; i <= 10; i++) {
        for (let type of types) {
            deck.push(i + type);
        }
    }
    for (let type of types) {
        for (let special of specials) {
            deck.push(special + type)
        }
    }
    deck = shuffleDeck(deck);
    console.log(deck)
    return deck
}

createDeck();


// Take one card from the deck
const takecard = () => {
    if (deck.length === 0) {
        throw 'No card in the deck'
    }
    const card = deck.pop();
    return card
}
takecard()


// Value depend of type of card
const cardValue = (card) => {
    const valor = card.slice(0, -1)

    if (isNaN(valor)) {
        // operador ternario condicion ? si es true : si no
        return (valor === 'A') ? 11 : 10;
    } else {
        return Number(valor);
    }
}
console.log(cardValue('3D'))
console.log(cardValue('JD'))
console.log(cardValue('AD'))

// 
