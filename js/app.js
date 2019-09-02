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
                console.log(pokemon)
                const ability = pokemon.abilities.map(abUrl => abUrl.ability.url);
                const abInfo = await urlAb(ability);    
                const location = await locationFetch(pokeName);

                let newPokemon = {
                    id: pokemon.id,
                    name: pokemon.name,
                    type: pokemon.types.map(e => e.type.name).join(", "),
                    image: pokemon.sprites.front_default,
                    ability,
                    abInfo,
                    location
                            
                }

                console.log(newPokemon)

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

const locationFetch = pokeName =>{
    const fetchLo = fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}/encounters`)
    .then(data => {
        data.json(), console.log(data)
    })
    .then(data => {
        console.log(data)
        const fetchedLo = Promise.all(fetchLo)
        console.log(fetchedLo)

        return fetchedLo.map(res => {
        const searchPokemonLo = res.name;
        return searchPokemonLo;
        }) 
    }).catch(() => locationError())

    
}

function pokemonError() {
    const nodePokemonList = document.querySelector('#pokemon-list');
    nodePokemonList.innerHTML = "";
    nodePokemonList.innerHTML = `<img class="error" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR82hH8EWMh8_J_pEGnB6U9HuELCLU3mdJTL0s_Z-OaUfEnzEnT"/>`;
}

function locationError() {
    const locationList = document.querySelector('#location-list');
    locationList.innerHTML = 'Pokemon doesn´t have a location'
}