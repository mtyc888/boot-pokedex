import { createInterface } from "readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMapBack, commandMapForward } from "./command_map.js";
import { commandExplore } from "./command_explore.js";
import { State } from "./state.js";
import { CLICommand } from "./state.js";
export function cleanInput(input: string): string[] {
  const arr:string[] = input.split(/\s+/);
  const arrCleaned:string[] = [];
  for(const char of arr){
    if(char !== ""){
        arrCleaned.push(char.toLowerCase());
    }
  }
  return arrCleaned;
}

export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: "exit",
      description: "Exits the pokedex",
      callback: commandExit,
    },
    help: {
        name: "help",
        description: "prints a help message describing how to use the REPL",
        callback: commandHelp,
    },
    map: {
      name: "map",
      description: "Get the next page of locations",
      callback: commandMapForward,
    },
    mapb: {
      name: "mapb", 
      description: "Get the previous page of locations",
      callback: commandMapBack,
    },
    explore: {
      name: "explore",
      description: "Explore an area for pokemons",
      callback: commandExplore,
    }
  };
}

export function startREPL(state: State) {
  state.readline.prompt();
  state.readline.on("line", async (input) => {
    const arr = cleanInput(input);
    if (arr.length === 0) {
      state.readline.prompt();
      return;
    }

    const commands = getCommands();
    const [commandName, ...args] = arr;

    if (commandName in commands) {
      try {
        await commands[commandName].callback(state, ...args);
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    } else {
      console.log("Unknown command");
    }

    state.readline.prompt();
  });
}