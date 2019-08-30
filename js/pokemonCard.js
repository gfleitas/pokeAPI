// Creating the card to be displayed

export const pokemonCard = (pokemon, node) => {
  
    node.innerHTML = `
    <div class="cardborder">
        <h3>${pokemon.name}</h3>
            <p><b>Type:</b> ${pokemon.type}</p>
            <hr>
            <img src="${pokemon.image}" alt="${pokemon.name}">
            <hr>
            <p>
            <b>Abilities:</b>
                <div class="overflowAbilities">${pokemon.abInfo}</div>
            </p>
    </div>
    `
}
 