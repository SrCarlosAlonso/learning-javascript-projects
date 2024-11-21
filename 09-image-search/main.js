// Variables de entorno
const AKEY_UNSPLASH = import.meta.env.VITE_UNSPLASH_AKEY;
const SKEY_UNSPLASH = import.meta.env.VITE_UNSPLASH_SKEY;
const AKEY_PIXABAY = import.meta.env.VITE_PIXABAY_KEY


let source = 'yellow+flowers';
const URL_PIXABAY = `https://pixabay.com/api/?key=${AKEY_PIXABAY}&q=`;
let URL = URL_PIXABAY + source;

// DOM
const imgContainer = document.querySelector('#images-container');
const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const filter_pixabay = document.querySelector('#filter-pixabay');
const filter_unspash = document.querySelector('#filter-unspash');

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

// Render image
async function renderImage(obj) {
  // Clear before
  while (imgContainer.firstChild) {
    imgContainer.removeChild(imgContainer.firstChild);
  }

  obj.forEach(image => {
    const img = document.createElement('img');
    img.src = image.webformatURL;
    img.alt = image.tags;
    img.onclick = () => changeBackground(image.webformatURL)
    imgContainer.appendChild(img);
  });
}
/*
 * Definir origen de imagenes
 */
document.addEventListener('DOMContentLoaded', function () {
  filter_pixabay.addEventListener('click', (e) => {
    const target = e.target;
    console.log(target);
  });
});
/*
 * Eventos de carga de imagenes
 */
// Load background image at start
document.addEventListener('DOMContentLoaded', function () {
  changeBackground();
});
// Change background image
function changeBackground(url) {
  backgroundHeader = url || backgroundHeader;
  document.documentElement.style.setProperty('--background-header', `url(${backgroundHeader})`);
}

// Eventos del formulario
searchInput.addEventListener('change', (e) => {
  e.preventDefault();
  source = e.target.value;
});

// Observamos el evento submit para regenerar imagenes
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  source = searchInput.value;
  if (source === '') {
    alert('Debes escribir algo para buscar')
    return;
  }
  URL = URL_PIXABAY + source;
  getData();
});

