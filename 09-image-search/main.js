// Variables de entorno
const KEY_UNSPLASH = import.meta.env.VITE_UNSPLASH_KEY;
const AKEY_PIXABAY = import.meta.env.VITE_PIXABAY_KEY

// URls de API
let source = 'yellow+flowers';
const URL_PIXABAY = `https://pixabay.com/api/?key=${AKEY_PIXABAY}&q=`;
// TODO: Configurar URL de unsplash
const URL_UNSPLASH = `https://api.unsplash.com/search/photos?client_id=${KEY_UNSPLASH}&query=office`;
let URL = URL_PIXABAY + source;

// DOM
const imgContainer = document.querySelector('#images-container');
const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const filter_container = document.querySelectorAll('.filter-options');

let backgroundHeader = 'https://images.unsplash.com/photo-1493673272479-a20888bcee10'

// Fetch
async function getDataPixabay() {
  try {
    const response = await fetch(URL);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();

    renderImage(data.hits);

  } catch (error) {
    console.log(error);
  }
} getDataPixabay();

// Render image
async function renderImage(obj) {
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
/**
 * Definir origen de imagenes
 */
document.addEventListener('DOMContentLoaded', function () {
  filter_container.forEach(filter => {
    filter.addEventListener('click', () => {

      const isChecked = filter.querySelector('input');
      if (isChecked) {
        isChecked.checked = true;
        isChecked.parentElement.classList.add('filter-active')
        // TODO: Crar una funcioon externa para poder usarlo en el evento submit
        if (isChecked.value === 'pixabay') {
          URL = URL_PIXABAY + source;
        } else {
          URL = URL_UNSPLASH + source;
        }
        getDataPixabay();
      }

      const noChecked = filter.nextElementSibling || filter.previousElementSibling;
      if (noChecked) {
        noChecked.classList.remove('filter-active');
      }

    })
  });
});

/**
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
  // TODO: Usar la funcion externa que hemos creado en el evento submit
  URL = URL_PIXABAY + source;
  getDataPixabay();
});
