const contentAcordeon = [
  {
    id: 1,
    title: "¿Qué colores se consideran primarios?",
    content: "Los colores primarios como el rojo, azul y amarillo son esenciales en la teoría del color. Estos colores no se pueden obtener mezclando otros colores y son fundamentales para crear combinaciones armoniosas.",
    image: "https://plus.unsplash.com/premium_vector-1689096833880-42980c252802?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 2,
    title: "¿Cómo se forman los colores secundarios?",
    content: "Los colores secundarios, como el verde, naranja y violeta, se forman mezclando dos colores primarios en partes iguales. Estas combinaciones permiten expandir la gama de colores y crear contrastes interesantes.",
    image: "https://plus.unsplash.com/premium_vector-1689096659615-ba27c09fa1ea?q=80&w=3112&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 3,
    title: "¿Qué es una forma geométrica?",
    content: "Las formas geométricas son figuras planas o tridimensionales que tienen propiedades definidas, como ángulos y lados. Ejemplos comunes incluyen círculos, cuadrados, triángulos y esferas.",
    image: "https://plus.unsplash.com/premium_vector-1689096635358-c37d266c4f31?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 4,
    title: "¿Cuáles son las formas básicas?",
    content: "Las formas geométricas básicas incluyen el círculo, el cuadrado, el triángulo y el rectángulo. Estas formas son fundamentales en el diseño y se utilizan para crear composiciones visuales equilibradas.",
    image: "https://plus.unsplash.com/premium_vector-1721903574478-d36e185ba73c?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 5,
    title: "¿Qué es el contraste de color?",
    content: "El contraste de color se refiere a la diferencia visual entre dos colores. Un alto contraste, como el que existe entre el negro y el blanco, crea una separación clara, mientras que los colores con bajo contraste pueden verse más suaves y menos definidos.",
    image: "https://plus.unsplash.com/premium_vector-1726490463160-982bc3089bec?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
]
// Create DOM elements
const acordeon = document.querySelector("#acordeon")
contentAcordeon.forEach(item => {
  const li = document.createElement("li")
  li.id = `id-${item.id}`
  li.addEventListener("click", () => toggleImage(item.id))
  const h3 = document.createElement("h3")
  const icon = document.createElement("img")
  const div = document.createElement("div")

  h3.innerText = item.title
  icon.src = '/public/icon.svg';
  div.innerText = item.content

  li.appendChild(h3)
  li.appendChild(icon)
  li.appendChild(div)

  acordeon.appendChild(li)
});


// Handel images
const containerImage = document.querySelector("#imagen-active")
const activeImage = document.createElement("img")
const liAcordeon = document.querySelectorAll("#acordeon li")

// Set first image
activeImage.src = contentAcordeon[0].image
containerImage.appendChild(activeImage)

// Handel hover images
liAcordeon.forEach(li => {
  let hoverTime;
  li.addEventListener('mouseenter', () => {
    hoverTime = setTimeout(() => {
      const id = li.id.replace('id-', '')
      toggleImage(id)
    }, 100);
  });

  li.addEventListener('mouseleave', () => {
    clearTimeout(hoverTime);
  });
});

// Toggle images
function toggleImage(id) {
  activeImage.remove();
  const newImage = contentAcordeon[`${id - 1}`].image
  containerImage.appendChild(activeImage)
  activeImage.src = newImage
}