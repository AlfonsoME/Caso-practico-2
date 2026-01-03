const API_URL = "https://dragonball-api.com/api/characters";
const charactersDiv = document.getElementById("characters");
const detailDiv = document.getElementById("detail");
const paginationDiv = document.getElementById("pagination");

let currentPage = 1;
let totalPages = 1;

// Mostrar personajes con paginación
async function loadCharacters(page = 1) {
  const res = await fetch(`${API_URL}?page=${page}&limit=10`);
  const data = await res.json();
  const characters = data.items;
  totalPages = data.meta.totalPages;
  currentPage = data.meta.currentPage;

  charactersDiv.innerHTML = "";
  characters.forEach(c => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${c.image}" alt="${c.name}">
      <h3>${c.name}</h3>
    `;
    card.onclick = () => showDetail(c.id);
    charactersDiv.appendChild(card);
  });

  renderPagination();
}

// Renderizar botones de paginación
function renderPagination() {
  paginationDiv.innerHTML = `
    <button onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? "disabled" : ""}>Anterior</button>
    <span>Página ${currentPage} de ${totalPages}</span>
    <button onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? "disabled" : ""}>Siguiente</button>
  `;
}

function changePage(page) {
  if (page >= 1 && page <= totalPages) {
    loadCharacters(page);
  }
}

// Mostrar detalle de un personaje
async function showDetail(id) {
  const res = await fetch(`${API_URL}/${id}`);
  const c = await res.json();

  detailDiv.innerHTML = `
    <img src="${c.image}" alt="${c.name}">
    <h2>${c.name}</h2>
    <p><strong>KI:</strong> ${c.ki}</p>
    <p>${c.description}</p>
    <button onclick="backToList()">Regresar</button>
  `;

  charactersDiv.classList.add("hidden");
  paginationDiv.classList.add("hidden");
  detailDiv.classList.remove("hidden");
}

// Regresar a la lista
function backToList() {
  detailDiv.classList.add("hidden");
  charactersDiv.classList.remove("hidden");
  paginationDiv.classList.remove("hidden");
}

loadCharacters();

