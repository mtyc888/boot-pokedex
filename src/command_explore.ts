import type { State } from "./state.js";

export async function commandExplore(state: State, ...args:string[]): Promise<void>{
    if (args.length < 1) {
    console.log("Usage: explore <area_name>");
    return;
    }
    const location = await state.pokeAPI.fetchLocation(args[0]);

    console.log(`Exploring ${args[0]}...`);
    console.log("Found Pokemon:");
    for(const poke of location.pokemon_encounters){
        console.log(` - ${poke.pokemon.name}`);
    }
}