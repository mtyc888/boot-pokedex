export async function pokedex(state) {
    for (const pokemon of Object.values(state.pokedex)) {
        console.log(` -${pokemon.name} `);
    }
}
