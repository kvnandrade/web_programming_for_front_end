const API_URL = "https://rickandmortyapi.com/api/character";

const charactersContainer = document.getElementById("characters-container");
const loadingElement = document.getElementById("loading");
const errorElement = document.getElementById("error-message");
const resultSummary = document.getElementById("result-summary");
const searchInput = document.getElementById("search-name");
const statusFilter = document.getElementById("status-filter");
const filtersForm = document.getElementById("character-filters");
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.getElementById("primary-menu");

let searchTimer;

function setLoading(isLoading) {
  loadingElement.hidden = !isLoading;
}

function showError(message) {
  errorElement.textContent = message;
  errorElement.hidden = false;
}

function clearError() {
  errorElement.textContent = "";
  errorElement.hidden = true;
}

function clearCharacters() {
  charactersContainer.innerHTML = "";
}

function translateStatus(status) {
  const statuses = {
    Alive: "Vivo",
    Dead: "Morto",
    unknown: "Desconhecido",
  };

  return statuses[status] || status;
}

function translateGender(gender) {
  const genders = {
    Female: "Feminino",
    Male: "Masculino",
    Genderless: "Sem gênero",
    unknown: "Desconhecido",
  };

  return genders[gender] || gender;
}

function createDetailItem(label, value) {
  const detailItem = document.createElement("li");
  const detailLabel = document.createElement("strong");

  detailLabel.textContent = `${label}: `;
  detailItem.appendChild(detailLabel);
  detailItem.appendChild(document.createTextNode(value || "Não informado"));

  return detailItem;
}

function createCharacterCard(character) {
  const card = document.createElement("article");
  const image = document.createElement("img");
  const info = document.createElement("div");
  const name = document.createElement("h3");
  const statusBadge = document.createElement("span");
  const details = document.createElement("ul");

  card.className = "character-card";
  info.className = "character-info";
  statusBadge.className = `status-badge ${character.status.toLowerCase()}`;
  details.className = "detail-list";

  image.src = character.image;
  image.alt = `Imagem do personagem ${character.name}`;
  image.loading = "lazy";

  name.textContent = character.name;
  statusBadge.textContent = translateStatus(character.status);

  details.appendChild(createDetailItem("Espécie", character.species));
  details.appendChild(createDetailItem("Gênero", translateGender(character.gender)));
  details.appendChild(createDetailItem("Última localização", character.location.name));

  info.appendChild(name);
  info.appendChild(statusBadge);
  info.appendChild(details);

  card.appendChild(image);
  card.appendChild(info);

  return card;
}

function renderCharacters(characters, totalResults) {
  clearCharacters();

  characters.forEach((character) => {
    const card = createCharacterCard(character);
    charactersContainer.appendChild(card);
  });

  const visibleCount = characters.length;
  const totalText = totalResults === 1 ? "1 personagem encontrado" : `${totalResults} personagens encontrados`;
  resultSummary.textContent = `Exibindo ${visibleCount} de ${totalText}.`;
}

function buildApiUrl() {
  const url = new URL(API_URL);
  const name = searchInput.value.trim();
  const status = statusFilter.value;

  if (name) {
    url.searchParams.set("name", name);
  }

  if (status) {
    url.searchParams.set("status", status);
  }

  return url;
}

async function fetchCharacters() {
  setLoading(true);
  clearError();
  resultSummary.textContent = "";

  try {
    const response = await fetch(buildApiUrl());

    if (response.status === 404) {
      clearCharacters();
      resultSummary.textContent = "Nenhum personagem encontrado com os filtros selecionados.";
      return;
    }

    if (!response.ok) {
      throw new Error("A API retornou uma resposta inesperada.");
    }

    const data = await response.json();
    renderCharacters(data.results, data.info.count);
  } catch (error) {
    clearCharacters();
    resultSummary.textContent = "";
    showError("Não foi possível carregar os personagens. Verifique sua conexão e tente novamente.");
    console.error("Erro ao consumir a API Rick and Morty:", error);
  } finally {
    setLoading(false);
  }
}

function debounceFetchCharacters() {
  window.clearTimeout(searchTimer);
  searchTimer = window.setTimeout(fetchCharacters, 450);
}

function closeMobileMenu() {
  menuToggle.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  navMenu.classList.remove("is-open");
}

function setupFilters() {
  filtersForm.addEventListener("submit", (event) => {
    event.preventDefault();
  });

  searchInput.addEventListener("input", debounceFetchCharacters);
  statusFilter.addEventListener("change", fetchCharacters);
}

function setupMobileMenu() {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.classList.toggle("is-open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    navMenu.classList.toggle("is-open", isOpen);
  });

  navMenu.addEventListener("click", (event) => {
    if (event.target.tagName === "A") {
      closeMobileMenu();
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupFilters();
  setupMobileMenu();
  fetchCharacters();
});
