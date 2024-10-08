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
    console.log(deck)
    console.log(card);
    return card
}
takecard()


// Value depend of type of card
const cardValue = (card) => {

    const valor = card.slice(0, -1)
    let point = 0;

    if (isNaN(valor)) {
        console.log('Not number')

        const letter = valor[0]
        console.log(letter)

        if (letter === 'K' || letter === 'J' || letter === 'Q') {
            point = 10;
            console.log(point)
            return

        } else if (letter === 'A') {
            point = 11;
            console.log(point)

        }

    } else {
        console.log('Number')
        point = Number(valor)
        console.log(point)
    }
}
cardValue('AD')