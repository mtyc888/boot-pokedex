import { Cache } from "./pokecache.js";
export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  cache:Cache;
  constructor(cacheInterval: number) {
      this.cache = new Cache(cacheInterval);
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    
    try{
        if(!pageURL){
          pageURL = `${PokeAPI.baseURL}/location-area/`;
        }
        const cache = this.cache.get<ShallowLocations>(pageURL);
        if(cache){
          return cache;
        }
        const response = await fetch(pageURL, {
          method: "GET",
          mode: "cors"
        });
        if(response.status != 200){
          throw new Error(`Error fetching data from API, error code:${response.status}`);
        }
        const res = await response.json();
        return res;
    }catch(err){
      throw new Error(`failed with error: ${err}`);
    }
  }
  async fetchPokemon(pokemonName: string): Promise<PokemonDetails>{
    //get the url
    let pageURL = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;
    //check if the data is cached
    const cache = this.cache.get<PokemonDetails>(pageURL);
    if(cache){
      return cache;
    }
    try{
      const response = await fetch(pageURL, {
        method: "GET",
        mode: "cors"
      });
      if(response.status != 200){
        throw new Error(`Error fetching data: ${response.status}`);
      }
      const res = await response.json();
      this.cache.add<PokemonDetails>(pageURL, res);
      return res;
    }catch(err){
      throw new Error(`Error fetching:${err}`);
    }
  }
  async fetchLocation(locationName: string): Promise<Location> {
    //get the url
    let pageURL = `${PokeAPI.baseURL}/location-area/${locationName}`;
    //check if the data is cached
    const cache = this.cache.get<Location>(pageURL);
    //if still cached, return the cache, no need to fetch via GET request
    if(cache){
      return cache;
    }
    try{
      const response = await fetch(pageURL, {
        method: "GET",
        mode: "cors"
      });
      if(response.status != 200){
        throw new Error(`Failed with error: ${response.status}`);
      }
      const res = await response.json();
      //after getting the response, store it into the cache
      this.cache.add<Location>(pageURL, res);
      return res;
    }catch(err){
      throw new Error(`Failed with error: ${err}`);
    }
  }
}

export type ShallowLocations = {
  count:number,
  next:string,
  previous:string,
  results: {
    name:string,
    url:string
  }[]
};
export type PokemonDetails = {
  abilities: {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }[];
  base_experience: number;
  forms: {
    name: string;
    url: string;
  }[];
  game_indices: {
    game_index: number;
    version: {
      name: string;
      url: string;
    };
  }[];
  height: number;
  held_items: any[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: {
    move: {
      name: string;
      url: string;
    };
    version_group_details: {
      level_learned_at: number;
      move_learn_method: {
        name: string;
        url: string;
      };
      version_group: {
        name: string;
        url: string;
      };
    }[];
  }[];
  name: string;
  order: number;
  past_types: any[];
  species: {
    name: string;
    url: string;
  };
  sprites: {
    back_default: string;
    back_female: any;
    back_shiny: string;
    back_shiny_female: any;
    front_default: string;
    front_female: any;
    front_shiny: string;
    front_shiny_female: any;
    other: {
      dream_world: {
        front_default: string;
        front_female: any;
      };
      home: {
        front_default: string;
        front_female: any;
        front_shiny: string;
        front_shiny_female: any;
      };
      official_artwork: {
        front_default: string;
        front_shiny: string;
      };
    };
    versions: {
      [generation: string]: {
        [game: string]: {
          back_default: string;
          back_female?: any;
          back_shiny: string;
          back_shiny_female?: any;
          front_default: string;
          front_female?: any;
          front_shiny: string;
          front_shiny_female?: any;
        };
      };
    };
  };
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  weight: number;
};

export type Location = {
  name: string,
  pokemon_encounters: PokemonDetails[]
};