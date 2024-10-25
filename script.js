const searchInput = document.getElementById('search');
const pokemonList = document.getElementById('pokemonList');

// Función para buscar Pokémon
async function searchPokemon() {
    const query = searchInput.value.toLowerCase();
    pokemonList.innerHTML = ''; // Limpiar resultados anteriores

    if (query) {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
            if (!response.ok) {
                throw new Error('Pokémon no encontrado');
            }
            const data = await response.json();
            displayPokemon(data);
        } catch (error) {
            pokemonList.innerHTML = `<p>${error.message}</p>`;
        }
    }
}

// Función para mostrar Pokémon en la lista
function displayPokemon(pokemon) {
    const card = document.createElement('div');
    card.className = 'pokemon-card';
    card.innerHTML = `
        <h2>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
        <p>Peso: ${pokemon.weight}</p>
        <p>Tipos: ${pokemon.types.map(type => type.type.name).join(', ')}</p>
    `;
    pokemonList.appendChild(card);
}

// Evento de entrada para el buscador
searchInput.addEventListener('input', searchPokemon);
