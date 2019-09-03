import {pokemonCard} from './pokemonCard.js'
import {historyPokemon} from './historyCard.js'

const form = document.querySelector('#form');

let pokemons = []

form.addEventListener('submit', e =>{
    
    e.preventDefault()
    searchPokemon();
})


const deletePokemon = pokemon => {

    const newPokemons = pokemons.filter(p => p.id !== pokemon.id) 
    pokemons = newPokemons
}

const searchPokemon = () => {

    let pokeName = document.getElementById("pokeName").value.toLowerCase();

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`) 
        .then( data => {

            data.json()
            .then(async pokemon =>{

                const ability = pokemon.abilities.map(abUrl => abUrl.ability.url);
                const abInfo = await urlAb(ability); 
                const locationInfo = await locationFetch(pokeName);

                let newPokemon = {
                    id: pokemon.id,
                    name: pokemon.name,
                    type: pokemon.types.map(e => e.type.name).join(", "),
                    image: pokemon.sprites.front_default,
                    ability,
                    abInfo,
                    locationInfo       
                }

                pokemons.push(newPokemon)

                const nodePokemonList = document.querySelector('#pokemon-list');
                const  nodeHistoryList = document.getElementById("result");

                pokemonCard(newPokemon, nodePokemonList)
                historyPokemon(newPokemon, nodeHistoryList, deletePokemon)
            }).catch(() => pokemonError())
        })
    }

const urlAb = async abilities => {

    const fetchAb = abilities.map(url => fetch(url).then(res => res.json())) // array with all fetched abilities
    const fetchedAb = await Promise.all(fetchAb) // await the responses
    
    return fetchedAb.map(res => {
        const searchAbLanguage = res.names.find(e => e.language.name === "en");
        const en = searchAbLanguage.name;
        const searchAbEffect = res.effect_entries.map(effect => effect.short_effect)
        const abNameAndEffect = en + ": " + searchAbEffect;

        return abNameAndEffect;
    }).join("<br><br>")
}

const locationFetch = async (pokeName) =>{

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}/encounters`)

    .then(data => {

        data.json()
        .then(resp => {

            const locationList = document.querySelector('#location-list');

            const locationArray = resp.map(locationsNames => locationsNames.location_area.name)
            const locations = JSON.stringify(`${locationArray}`).replace(/-/g, " ").replace(/"/g, "").replace(/,/g, ",&nbsp");
            
            locations ? locationList.innerHTML= `${locations}` : locationList.innerHTML=`${pokeName} doesn't have locations. ${pokeName} is a starter Pokemon or a legendary Pokemon`
        })
    })
}

function pokemonError() {
    const nodePokemonList = document.querySelector('#pokemon-list');
    nodePokemonList.innerHTML = "";
    nodePokemonList.innerHTML = `<img class="error" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR82hH8EWMh8_J_pEGnB6U9HuELCLU3mdJTL0s_Z-OaUfEnzEnT"/>`;
}