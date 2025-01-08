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

const getCharacters = async (url) => {

  try {
    const response = await fetch(url);
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

getCharacters(urlCharacters);

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
  const pagination = document.createElement("ul");
  pagination.classList.add("pagination");

  const prevButton = document.createElement("li");
  prevButton.innerText = "← Prev";
  prevButton.id = "pag-prev";
  prevButton.addEventListener("click", () => {
    if (prev === null) return;
    deleteChildren(charactersWrapper);
    deleteChildren(pagination);
    getCharacters(prev);
  });
  pagination.appendChild(prevButton);

  let pagesMin = 1;
  let pagesMax = 3;
  for (let i = pagesMin; i <= pagesMax; i++) {
    const number = document.createElement("li");
    number.innerText = i;
    number.addEventListener("click", () => {
      deleteChildren(charactersWrapper);
      deleteChildren(pagination);
      getCharacters(`${urlCharacters}?page=${i}`);
    });
    pagination.appendChild(number);
  }

  // Hacer que no se vean todos los números
  // Hacer que se vean los números de la página actual y las dos anteriores y las dos siguientes

  const nextButton = document.createElement("li");
  nextButton.innerText = "Next →";
  nextButton.id = "pag-next";
  nextButton.addEventListener("click", () => {
    deleteChildren(charactersWrapper);
    deleteChildren(pagination);
    getCharacters(next);
  });
  pagination.appendChild(nextButton);

  appFooter.appendChild(pagination);

  console.log(
    `Pages: ${pages},
    Next: ${next},
    Prev: ${prev}`
  )
}


//Helpes functions
const deleteChildren = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
