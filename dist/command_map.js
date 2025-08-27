export async function commandMapForward(state) {
    const locations = await state.pokeAPI.fetchLocations(state.nextLocationsURL);
    state.nextLocationsURL = locations.next;
    state.prevLocationsURL = locations.previous;
    for (const location of locations.results) {
        console.log(`${location.name}`);
    }
}
export async function commandMapBack(state) {
    if (!state.prevLocationsURL) {
        console.log("You are on the first page");
        return;
    }
    const locations = await state.pokeAPI.fetchLocations(state.prevLocationsURL);
    state.nextLocationsURL = locations.next;
    state.prevLocationsURL = locations.previous;
    for (const location of locations.results) {
        console.log(`${location.name}`);
    }
}
