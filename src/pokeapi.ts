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
  name: string,
  base_experience: number
} 
export type PokemonEncounter = {
  pokemon: { 
    name: string; 
    url: string 
  },
  version_details: [
    {
      version:{
        name: string,
        url: string
      },
      max_chance: number,
      encounter_details:[
        {
          min_level: number,
          max_level: number,
          condition_values: [],
          chance: number,
          method: {
            name: string,
            url: string
          }
        }
      ]
    }
  ]
};
export type Location = {
  name: string,
  pokemon_encounters: PokemonEncounter[]
};