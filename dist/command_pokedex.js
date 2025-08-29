export async function pokedex(state) {
    for (let pokemon of Object.values(state.pokedex)) {
        console.log(` -${pokemon.name} `);
    }
}
