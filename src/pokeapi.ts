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
type PokemonEncounter = {
  pokemon: { name: string; url: string };
};
export type Location = {
  name: string,
  pokemon_encounters: PokemonEncounter[]
};