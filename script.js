const pokemonID = document.getElementById('pokemon-id');
const pokemonName = document.getElementById('pokemon-name');
const spriteContainer = document.getElementById('sprite-container');
const types = document.getElementById('types');
const height = document.getElementById('height');
const weight = document.getElementById('weight');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById("search-button");

searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const query = searchInput.value.trim().toLowerCase();
    if (!query) {
        alert("Pokémon not found");
        return;
    }

    const apiUrl = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${query}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            alert("Pokémon not found");
            return;
        }

        const data = await response.json();
        console.log(data);

        pokemonName.textContent = `${data.name.toUpperCase()}`;
        pokemonID.textContent = `#${data.id}`;
        weight.textContent = `Peso: ${data.weight}` ;
        height.textContent = `Altura: ${data.height}`;
        spriteContainer.innerHTML = `
      <img id="sprite" src="${data.sprites.front_default}" alt="${data.name} front default sprite">
    `;

        const statsMap = {
            hp: 'hp',
            attack: 'attack',
            defense: 'defense',
            'special-attack': 'special-attack',
            'special-defense': 'special-defense',
            speed: 'speed',
        };

        data.stats.forEach(stat => {
            const statName = stat.stat.name;
            const statValue = stat.base_stat;
            if (statsMap[statName]) {
                const statElement = document.getElementById(statsMap[statName]);
                if (statElement) {
                    statElement.textContent = statValue;
                }
            }
        });

        types.innerHTML = data.types
            .map(obj => `<span class="type ${obj.type.name}">${obj.type.name}</span>`)
            .join('');

    } catch (error) {
        alert("Pokémon not found");
        console.error(error);
    }

    const resetDisplay = () => {
        const sprite = document.getElementById('sprite');
        if (sprite) sprite.remove();
      
        
        pokemonName.textContent = '';
        pokemonID.textContent = '';
        types.innerHTML = '';
        height.textContent = '';
        weight.textContent = '';
        hp.textContent = '';
        attack.textContent = '';
        defense.textContent = '';
        specialAttack.textContent = '';
        specialDefense.textContent = '';
        speed.textContent = '';
      };
});



  searchBtn.addEventListener("click", searchInput)
