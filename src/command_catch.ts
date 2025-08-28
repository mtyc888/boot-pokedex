import { State } from "./state.js";

export async function commandCatch(state:State, name:string): Promise<void>{
    if(!name){
        console.log("Usage: catch <pokemon>");
        return;
    }
    console.log(`Throwing a Pokeball at ${name}...`);
    const pokemon = await state.pokeAPI.fetchPokemon(name);
}