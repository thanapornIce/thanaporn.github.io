let offset = 0;
const limit = 20;

document.addEventListener("DOMContentLoaded", () => {
    const loadMoreBtn = document.getElementById("load-more-btn");
    loadMoreBtn.addEventListener("click", loadMorePokemon);
    loadMorePokemon();
});

function loadMorePokemon() {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayPokemonList(data.results);
            offset += limit;
        })
        .catch(error => console.error("Error fetching Pokémon:", error));
}

function displayPokemonList(pokemonList) {
    const pokemonContainer = document.getElementById("pokemon-list");
    pokemonList.forEach(pokemon => {
        const pokemonCard = document.createElement("div");
        pokemonCard.classList.add("pokemon-card");
        pokemonCard.addEventListener("click", () => loadPokemonDetails(pokemon.url));
        
        pokemonCard.innerHTML = `
            <h3>${pokemon.name}</h3>
        `;
        pokemonContainer.appendChild(pokemonCard);
        
        fetch(pokemon.url)
            .then(response => response.json())
            .then(pokemonData => {
                const img = document.createElement("img");
                img.src = pokemonData.sprites.front_default;
                pokemonCard.appendChild(img);
            });
    });
}

function loadPokemonDetails(url) {
    fetch(url)
        .then(response => response.json())
        .then(pokemon => {
            displayPokemonDetails(pokemon);
        })
        .catch(error => console.error("Error fetching Pokémon details:", error));
}

function displayPokemonDetails(pokemon) {
    const container = document.querySelector(".container");
    container.innerHTML = `
        <h1>${pokemon.name}</h1>
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <p>Height: ${pokemon.height / 10} m</p>
        <p>Weight: ${pokemon.weight / 10} kg</p>
        <div>Types: ${pokemon.types.map(type => `<a href="#" onclick="loadType('${type.type.url}')">${type.type.name}</a>`).join(", ")}</div>
        <div>Abilities: ${pokemon.abilities.map(ability => `<a href="#" onclick="loadAbility('${ability.ability.url}')">${ability.ability.name}</a>`).join(", ")}</div>
        <div>Stats: ${pokemon.stats.map(stat => `<p>${stat.stat.name}: ${stat.base_stat}</p>`).join("")}</div>
        <button onclick="window.location.reload()">Back</button>
    `;
}

function loadType(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayPokemonList(data.pokemon.map(p => p.pokemon));
        })
        .catch(error => console.error("Error fetching type:", error));
}

function loadAbility(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayPokemonList(data.pokemon.map(p => p.pokemon));
        })
        .catch(error => console.error("Error fetching ability:", error));
}
