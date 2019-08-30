import {pokemonCard} from './pokemonCard.js'
import {historyPokemon} from './historyCard.js'

const form = document.querySelector('#form');

let pokemons = []

form.addEventListener('submit', e =>{
    e.preventDefault()
    searchPokemon();
})


const deletePokemon = pokemon => {
    console.log(pokemon)
    const newPokemons = pokemons.filter(p => p.id !== pokemon.id) 
    pokemons = newPokemons
    console.log(newPokemons)
}

const searchPokemon = () => {
    
    let pokeName = document.getElementById("pokeName").value.toLowerCase();

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`) 
        .then( data => {
            data.json()
            .then(async pokemon =>{

                const ability = pokemon.abilities.map(abUrl => abUrl.ability.url);
                const abInfo = await urlAb(ability)
                

                let newPokemon = {
                    id: pokemon.id,
                    name: pokemon.name,
                    type: pokemon.types.map(e => e.type.name).join(", "),
                    image: pokemon.sprites.front_default,
                    ability,
                    abInfo
                }
                console.log(newPokemon)

                pokemons.push(newPokemon)

                const nodePokemonList = document.querySelector('#pokemon-list');
                const  nodeHistoryList = document.getElementById("result");

                pokemonCard(newPokemon, nodePokemonList)
                historyPokemon(newPokemon, nodeHistoryList, deletePokemon)
            })
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