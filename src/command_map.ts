import type { State } from "./state.js";
export async function commandMapForward(state: State):Promise<void>{
    const locations = await state.pokeAPI.fetchLocations(state.nextLocationsURL);
    state.nextLocationsURL = locations.next;
    state.prevLocationsURL = locations.previous;
    
    for(const location of locations.results){
        console.log(`${location.name}`);
    }
}

export async function commandMapBack(state: State):Promise<void>{
    if(!state.prevLocationsURL){
        console.log("You are on the first page");
        return;
    }
    const locations = await state.pokeAPI.fetchLocations(state.prevLocationsURL);
    state.nextLocationsURL = locations.next;
    state.prevLocationsURL = locations.previous;
    for(const location of locations.results){
        console.log(`${location.name}`);
    }
}