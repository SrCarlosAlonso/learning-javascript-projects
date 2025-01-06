import "./style.css";

// API
// https://rickandmortyapi.com/documentation/
// https://breakingbadquotes.xyz/

const title = "Hello Vite!";

document.querySelector("#app").innerHTML = `
  <div>
    <h1 id="app-title"> ${title} </h1>
    <div class="card">
    </div>
  </div>

`;

setupCounter(document.querySelector("#counter"));
