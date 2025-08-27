export async function commandHelp(state) {
    console.log("Welcome to the Pokedex!");
    console.log("Usage:");
    console.log("");
    // You can now access the commands from state!
    for (const command of Object.values(state.commands)) {
        console.log(`${command.name}: ${command.description}`);
    }
}
