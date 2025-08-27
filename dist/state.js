import { createInterface } from "readline";
import { getCommands } from "./repl.js";
import { PokeAPI } from "./pokeapi.js";
export function initState() {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex >"
    });
    return {
        readline: rl,
        commands: getCommands(),
        pokeAPI: new PokeAPI,
        nextLocationsURL: "",
        prevLocationsURL: ""
    };
}
