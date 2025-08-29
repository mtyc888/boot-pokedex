import { createInterface, type Interface } from "readline";
import { getCommands } from "./repl.js";
import { PokeAPI, PokemonDetails } from "./pokeapi.js";

export type State = {
    readline: Interface,
    commands: Record<string, CLICommand>
    pokeAPI: PokeAPI,
    nextLocationsURL: string,
    prevLocationsURL: string,
    pokedex: Record<string, PokemonDetails>
}

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export function initState(cacheInterval: number){
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex >"
    });

    return {
        readline: rl,
        commands: getCommands(),
        pokeAPI: new PokeAPI(cacheInterval),
        nextLocationsURL: "",
        prevLocationsURL: "",
        pokedex: {}
    };
}