import "./style.css";

// API:
// https://rickandmortyapi.com/documentation/
// https://breakingbadquotes.xyz/

document.querySelector("#app").innerHTML = `
  <div>
    <h1 id="app-title"> Hello Vite!</h1>
    <div class="card">
    </div>
  </div>
`;

setupCounter(document.querySelector("#counter"));
