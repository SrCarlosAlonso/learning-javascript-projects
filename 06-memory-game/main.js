console.log("Hello World!")

// DOM scipting
const navButtons = document.getElementById("nav-buttons");
const actionButton = document.getElementById("action-button");
const endButton = document.getElementById("end-button");

const triesCounter = document.getElementById("tries-counter");
const missesCounter = document.getElementById("misses-counter");
const timerCounter = document.getElementById("timer-counter");

triesCounter.innerText = 0;
missesCounter.innerText = 0;
let setTimer = timerCounter.innerText = 10;

const gameContainer = document.querySelector(".game-container");

// Events listeners
document.addEventListener("DOMContentLoaded", () => {
  renderCards(cardGames);
});

actionButton.addEventListener("click", () => {
  resetGame();
});

// Define cards
const cards = [
  { name: 'brocoli', img: '/assets/img/img-brocoli.webp', state: false },
  { name: 'frenshfries', img: '/assets/img/img-frenshfries.webp', state: false },
  { name: 'fresa', img: '/assets/img/img-fresa.webp', state: false },
  { name: 'pizza', img: '/assets/img/img-pizza.webp', state: false },
  { name: 'popcorn', img: '/assets/img/img-popcorn.webp', state: false },
  { name: 'sushi', img: '/assets/img/img-sushi.webp', state: false },
];
let cardGames = [...cards, ...cards];
shuffleCards(cardGames);

// Render cards
function renderCards(card) {
  while (gameContainer.firstChild) {
    gameContainer.removeChild(gameContainer.firstChild);
  }

  card.forEach((card) => {
    let { name, state } = card;
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.classList.add("card-unknown");
    cardElement.id = `card-${name}`

    cardElement.onclick = () => {
      cardElement.classList.add("card-known");
      cardElement.classList.remove("card-unknown");
      const cardImg = document.createElement("img");
      cardImg.src = card.img;
      cardElement.appendChild(cardImg);
      return checkCards(card, cardElement);
    }
    gameContainer.appendChild(cardElement);
  });
}

// Check cards
let firstCard = null;
let secondCard = null;
let containerFirstCard, containerSecondCard;
function checkCards(card, htmlCard) {
  const { name } = card;
  // Como selecciono el elemento htmo de esta carta

  if (firstCard === null) {
    firstCard = name;
    containerFirstCard = htmlCard;
    return containerFirstCard;
  }

  if (secondCard === null) {
    secondCard = name;
    containerSecondCard = htmlCard;
  }

  if (firstCard === secondCard) {
    console.log('Same cards!');
  } else {
    console.log('Different cards!');

    setTimeout(() => {
      missesCounter.innerText = +missesCounter.innerText + 1;

      containerFirstCard.classList.remove("card-known");
      containerFirstCard.classList.add("card-unknown");
      const imgFirtCard = containerFirstCard.querySelector("img");
      imgFirtCard.remove();

      containerSecondCard.classList.remove("card-known");
      containerSecondCard.classList.add("card-unknown");
      const imgSecondCard = containerSecondCard.querySelector("img");
      imgSecondCard.remove();
    }, 500);

    triesCounter.innerText = +triesCounter.innerText + 1;
  }
  firstCard = null;
  secondCard = null;
}

// Fisher-yates shuffle cards 
function shuffleCards(cards) {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
}

// Functions
let isStarted = false;

actionButton.addEventListener("click", () => {
  navButtons.firstElementChild.remove()
  const restarButton = document.createElement("button");
  restarButton.innerText = "Restart";
  restarButton.id = "restart-button";

  navButtons.insertBefore(restarButton, navButtons.firstChild);

  restarButton.addEventListener("click", () => {
    navButtons.firstElementChild.remove()
    const startButton = document.createElement("button");
    startButton.innerText = "Start";
    startButton.id = "action-button";
    navButtons.insertBefore(startButton, navButtons.firstChild);

    startButton.addEventListener("click", () => {
      startTimer();
    });

    resetGame();
    startTimer();
  });

  startTimer();
  return;
});

let counterDown;
function startTimer() {
  isStarted = !isStarted;

  if (!isStarted) {
    console.log('Timer is already started!');
    renderCards(cardGames);
    setTimer = 10;
    clearInterval(counterDown);
    return;
  };

  counterDown = setInterval(() => {
    setTimer--;
    timerCounter.innerText = setTimer;

    if (setTimer === 0) {
      console.log('Time is over!');
      isStarted = false;
      return clearInterval(counterDown);
    }
  }, 1000);

  isStarted = true;
}

// Reset game
function resetGame() {
  setTimer = 10;
  timerCounter.innerText = setTimer;
  triesCounter.innerText = 0;
  missesCounter.innerText = 0;
  renderCards(cardGames);
}