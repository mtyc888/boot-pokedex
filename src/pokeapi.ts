export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    try{
        if(!pageURL){
          pageURL = `${PokeAPI.baseURL}/location-area/`;
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
    let pageURL = `${PokeAPI.baseURL}/location-area/${locationName}`;
    try{
      const response = await fetch(pageURL, {
        method: "GET",
        mode: "cors"
      });
      if(response.status != 200){
        throw new Error(`Failed with error: ${response.status}`);
      }
      const res = await response.json();
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

export type Location = {
  name: string
};