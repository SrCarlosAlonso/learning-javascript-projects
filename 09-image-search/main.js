// Variables de entorno
const AKEY_UNSPLASH = import.meta.env.VITE_UNSPLASH_AKEY;
const SKEY_UNSPLASH = import.meta.env.VITE_UNSPLASH_SKEY;
const AKEY_PIXABAY = import.meta.env.VITE_PIXABAY_KEY;
const URL_PIXAVAY = 'https://pixabay.com/api/?key=8305684-c57a424dfd0b3763951a9869a&q=yellow+flowers&image_type=photo&pretty=true'
let URL = URL_PIXAVAY;

// DOM
const imgContainer = document.querySelector('#images-container');
const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');

let backgroundHeader = 'https://images.unsplash.com/photo-1493673272479-a20888bcee10'

// Fetch
async function getData() {

  try {
    const response = await fetch(URL);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();

    renderImage(data.hits);

  } catch (error) {
    console.log(error);
  }
} getData();

async function renderImage(obj) {
  // Clear
  while (imgContainer.firstChild) {
    imgContainer.removeChild(imgContainer.firstChild);
  }
  // Render
  obj.forEach(image => {
    const img = document.createElement('img');
    img.src = image.webformatURL;
    img.alt = image.tags;
    img.onclick = () => changeBackground(image.webformatURL)
    imgContainer.appendChild(img);
  });
}

// Eventos
document.addEventListener('DOMContentLoaded', function () {
  changeBackground(backgroundHeader);
});

function changeBackground(url) {
  backgroundHeader = url;
  document.documentElement.style.setProperty('--background-header', `url(${backgroundHeader})`);
}
