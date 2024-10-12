/*
 * Game
 */

let deck = [];
const types = ['C', 'D', 'H', 'S'];
const specials = ['A', 'J', 'Q', 'K'];

// DOM elements
const btnNewGame = document.querySelector('#newGame'),
    btnHit = document.querySelector('#hit'),
    btnStand = document.querySelector('#stand');

const deckContainerPlayer = document.querySelector('#player-deck'),
    deckContainerComp = document.querySelector('#computer-deck'),
    txtPlayerScore = document.querySelector('#playerScore'),
    txtComputerScore = document.querySelector('#computerScore');

let playerScore = 0,
    computerScore = 0;


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

// Take one card from the deck
const takecard = () => {
    if (deck.length === 0) {
        throw 'No card in the deck'
    }
    const card = deck.pop();
    console.log(deck)
    return card
}

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

//Show the card in the deck
function showCard(card, deckContainer) {
    const img = document.createElement('img');
    img.src = '/assets/cartas/' + card + '.png';
    img.alt = card;
    img.classList.add('card');
    deckContainer.appendChild(img);
}

// Function players
function playerGame() {
    console.log('Player turns')

    if (playerScore < 21) {
        const card = takecard();
        const value = cardValue(card);
        playerScore = playerScore + value;
        txtPlayerScore.textContent = playerScore;
        showCard(card, deckContainerPlayer);
        return
    } else {
        computerGame();
    }
}

function computerGame() {
    console.log('Computer turns')
    do {
        const card = takecard();
        const value = cardValue(card);
        computerScore = computerScore + value;
        txtComputerScore.textContent = computerScore;
        showCard(card, deckContainerComp);

        if (computerScore >= 21 || playerScore > 21) break;
    }
    while (computerScore < 21 && computerScore <= playerScore) {
    }
    return;
}

// Event lister 
btnNewGame.addEventListener('click', function () {
    createDeck();
    txtPlayerScore.textContent = playerScore;

    btnStand.disabled = false;
    btnHit.disabled = false;

    playerScore = 0;
    computerScore = 0;

    deckContainerPlayer.innerHTML = '';
    deckContainerComp.innerHTML = '';
    txtComputerScore.textContent = 0;
    txtPlayerScore.textContent = 0;

    btnNewGame.style.backgroundColor = 'tomato';
    btnNewGame.style.color = '#fff';
    btnNewGame.style.border = '1px solid tomato'

    playerGame();
});

btnHit.addEventListener('click', function () {
    playerGame();
    if (playerScore >= 21) {
        computerGame();
    }
});

btnStand.addEventListener('click', function () {
    btnHit.disabled = true;
    btnStand.disabled = true;
    computerGame();
});
