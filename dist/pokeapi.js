import { Cache } from "./pokecache.js";
export class PokeAPI {
    static baseURL = "https://pokeapi.co/api/v2";
    cache;
    constructor(cacheInterval) {
        this.cache = new Cache(cacheInterval);
    }
    async fetchLocations(pageURL) {
        try {
            if (!pageURL) {
                pageURL = `${PokeAPI.baseURL}/location-area/`;
            }
            const cache = this.cache.get(pageURL);
            if (cache) {
                return cache;
            }
            const response = await fetch(pageURL, {
                method: "GET",
                mode: "cors"
            });
            if (response.status != 200) {
                throw new Error(`Error fetching data from API, error code:${response.status}`);
            }
            const res = await response.json();
            return res;
        }
        catch (err) {
            throw new Error(`failed with error: ${err}`);
        }
    }
    async fetchPokemon(pokemonName) {
        //get the url
        let pageURL = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;
        //check if the data is cached
        const cache = this.cache.get(pageURL);
        if (cache) {
            return cache;
        }
        try {
            const response = await fetch(pageURL, {
                method: "GET",
                mode: "cors"
            });
            if (response.status != 200) {
                throw new Error(`Error fetching data: ${response.status}`);
            }
            const res = await response.json();
            this.cache.add(pageURL, res);
            return res;
        }
        catch (err) {
            throw new Error(`Error fetching:${err}`);
        }
    }
    async fetchLocation(locationName) {
        //get the url
        let pageURL = `${PokeAPI.baseURL}/location-area/${locationName}`;
        //check if the data is cached
        const cache = this.cache.get(pageURL);
        //if still cached, return the cache, no need to fetch via GET request
        if (cache) {
            return cache;
        }
        try {
            const response = await fetch(pageURL, {
                method: "GET",
                mode: "cors"
            });
            if (response.status != 200) {
                throw new Error(`Failed with error: ${response.status}`);
            }
            const res = await response.json();
            //after getting the response, store it into the cache
            this.cache.add(pageURL, res);
            return res;
        }
        catch (err) {
            throw new Error(`Failed with error: ${err}`);
        }
    }
}
