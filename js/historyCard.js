// This is where we will recording the pokemons in the history
export function historyPokemon(pokemon, node, deleteFunction) {

    let label = document.createElement("label");
    label.setAttribute('class','historycard');
    node.appendChild(label);

    let image = document.createElement("img");
    image.setAttribute('src',`${pokemon.image}`);
    label.appendChild(image);

    let iconTimes = document.createElement("i");
    iconTimes.classList.add("far","fa-times-circle");
    label.appendChild(iconTimes);

    let result = document.getElementById("result");
    result.appendChild(label)

    iconTimes.addEventListener('click',function(event){
        event.preventDefault();

        deleteFunction(pokemon)
        var deleteIcon = event.target.parentNode;
        deleteIcon.parentNode.removeChild(deleteIcon);
     },false);
}