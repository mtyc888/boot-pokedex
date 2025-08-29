export async function commandCatch(state, name) {
    if (!name) {
        console.log("Usage: catch <pokemon>");
        return;
    }
    console.log(`Throwing a Pokeball at ${name}...`);
    const pokemon = await state.pokeAPI.fetchPokemon(name);
    const catch_probability = Math.min(pokemon.base_experience / 1000, 1);
    const player_probability = Math.random();
    if (player_probability > catch_probability) {
        state.pokedex[pokemon.name] = pokemon;
        console.log(`${pokemon.name} was caught!`);
    }
    else {
        console.log(`${pokemon.name} escaped!`);
    }
}
