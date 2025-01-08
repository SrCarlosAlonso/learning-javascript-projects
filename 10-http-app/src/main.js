// API
// https://rickandmortyapi.com/documentation/
// https://breakingbadquotes.xyz/
const nameApp = "Rick and Morty API";
const appContainer = document.querySelector("#app");
const appHeading = document.querySelector("header");
const appTitle = document.createElement("h1");
const charactersWrapper = document.querySelector(".wrapper");
const appFooter = document.querySelector("footer");

appTitle.innerText = nameApp;
appHeading.appendChild(appTitle);

const urlCharacters = "https://rickandmortyapi.com/api/character";

const getCharacters = async () => {

  try {
    const response = await fetch(urlCharacters);
    const data = await response.json();
    const characters = data.results;
    const pagination = data.info;

    printPagination(pagination);

    characters.forEach(character => {
      printCard(character);
    })
  }
  catch (error) {
    console.error(error);
  }
}

getCharacters();

const printCard = (objCharacter) => {
  const { name, image } = objCharacter;

  const card = document.createElement("div")
  card.classList.add("card");

  const img = document.createElement("img");
  img.src = image;
  img.alt = name;
  card.appendChild(img);

  const nameCard = document.createElement("h2");
  nameCard.innerText = name;
  card.appendChild(nameCard);

  charactersWrapper.appendChild(card);
}

const printPagination = (info) => {
  const { pages, next, prev } = info;
}


//Helpes functions
const deleteChildren = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
