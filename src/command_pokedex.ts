import { State } from './state.js';
export async function pokedex(state: State):Promise<void>{
    for(let pokemon of Object.values(state.pokedex)){
        console.log(` -${pokemon.name} `);
    }
}