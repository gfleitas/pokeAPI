// Creating the card to be displayed

export const pokemonCard = (pokemon, node) => {
  
    node.innerHTML = `
    <div class="cardborder">
        <h3>${pokemon.name}</h3>
            <p><b>Type:</b> ${pokemon.type} &nbsp &nbsp &nbsp<b>ID:</b>${pokemon.id}</p>
            <hr>
            <img src="${pokemon.image}" alt="${pokemon.name}">
            <hr>
            <p>
            <b>Locations:</b>
                <div id="location-list" style="font-family: 'Fjalla One', sans-serif;">${pokemon.location}</div>
            </p>
            <p>
            <b>Abilities:</b>
                <div class="overflowAbilities">${pokemon.abInfo}</div>
            </p>
    </div>
    `
}
 