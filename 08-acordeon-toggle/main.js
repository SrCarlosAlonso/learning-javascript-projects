// Import json y asignar al content
import contentJSON from "./acordeon-content.json";
const contentAcordeon = contentJSON;

// Create DOM elements
const acordeon = document.querySelector("#acordeon");
contentAcordeon.forEach((item) => {
  const li = document.createElement("li");
  li.id = `id-${item.id}`;
  li.addEventListener("click", () => acordeonToggle(item.id));
  const h3 = document.createElement("h3");
  const icon = document.createElement("img");
  const div = document.createElement("div");
  div.id = `cont-${item.id}`;
  div.classList.add('hidden')

  h3.innerText = item.title;
  icon.src = "/public/icon.svg";
  div.innerText = item.content;

  li.appendChild(h3);
  li.appendChild(icon);
  li.appendChild(div);

  acordeon.appendChild(li);
});

// Handel images
const containerImage = document.querySelector("#imagen-active");
const activeImage = document.createElement("img");
const liAcordeon = document.querySelectorAll("#acordeon li");

// Set first image
activeImage.src = contentAcordeon[0].image;
containerImage.appendChild(activeImage);

// Handel hover images
liAcordeon.forEach((li) => {
  let hoverTime;
  li.addEventListener("mouseenter", () => {
    hoverTime = setTimeout(() => {
      const id = li.id.replace("id-", "");
      toggleImage(id);
    }, 500);
  });

  li.addEventListener("mouseleave", () => {
    clearTimeout(hoverTime);
  });
});

// Toggle images
function toggleImage(id) {
  activeImage.remove();
  const newImage = contentAcordeon[`${id - 1}`].image;
  containerImage.appendChild(activeImage);
  activeImage.src = newImage;
}

// Mostrar content
let isActive;

function acordeonToggle(id) {
  const contentID = `#cont-${id}`;
  const contentAcordeon = document.querySelector(contentID)
  const icon = contentAcordeon.parentElement.querySelector('img');

  if (isActive) {
    contentAcordeon.classList.add('hidden-height');
    contentAcordeon.classList.remove('active');
    icon.style.transform = 'rotate(0deg)';
    setTimeout(() => {
      contentAcordeon.classList.add('hidden');
    }, 10);
    isActive = false;

  } else {
    contentAcordeon.classList.remove('hidden');
    contentAcordeon.classList.remove('hidden-height');
    contentAcordeon.classList.add('active');
    icon.style.transform = 'rotate(180deg)';
    isActive = true;
  }
}

// Crear slider de las imagenes

// Sacamos las imagenes del json y las metemos en un array
const sliderImages = [];
const sliderContainer = document.querySelector('.slider');
const sliderItem = document.querySelectorAll('.slider-item');

function setImageSlider() {
  contentAcordeon.map((item) => {
    const { image } = contentAcordeon
    sliderImages.push(item.image);
  });
  return createSlider(sliderImages)
}
setImageSlider();

// Crear función que recorre el array y crea cada slider
function createSlider(array) {
  let count = 0;

  array.forEach(image => {
    const div = document.createElement('div');
    div.classList.add('slider-item')
    div.id = `slider-item-${count += 1}`;
    const img = document.createElement('img');
    img.src = image;

    div.appendChild(img);
    sliderContainer.appendChild(div);
  });
}
// Crear una funcion que oculta y muestra cada slide
const containerIMG = document.querySelectorAll('.slider-item');

function actionSlider() {
  let index = 0;
  const count = containerIMG.length;

  showImage(index)

  setInterval(() => {
    hiddeImage(index);

    index += 1;
    if (index === count) {
      index = 0;
    }
    showImage(index);
  }, 1250);

}
actionSlider();

function showImage(index) {
  const nextImg = containerIMG[`${index}`];
  nextImg.classList.add('slide-active');
}

function hiddeImage(index) {
  const activeImg = containerIMG[`${index}`];
  activeImg.classList.remove('slide-active');
}