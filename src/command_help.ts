import type { State } from "./state.js";

export async function commandHelp(state: State): Promise<void> {
    console.log("Welcome to the Pokedex!");
    console.log("Usage:");
    console.log("");
    
    // You can now access the commands from state!
    for (const command of Object.values(state.commands)) {
        console.log(`${command.name}: ${command.description}`);
    }
}