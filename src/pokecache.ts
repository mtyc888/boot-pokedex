export type CacheEntry<T> = {
    createdAt: number;
    val: T;
}

export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: NodeJS.Timeout | undefined = undefined;
  #interval: number;

constructor(interval: number) {
    this.#interval = interval;
    this.#startReapLoop();
}

  add<T>(key: string, val: T){
    const timestampMs: number = Date.now();
    const cacheObj: CacheEntry<T> = {
        createdAt: timestampMs,
        val: val
    }
    this.#cache.set(key, cacheObj);
  }
  get<T>(key: string):T | undefined{
    const entry = this.#cache.get(key);
    if(!entry){
        return undefined;
    }
    return entry.val;
  }
  #reap(): void{
    this.#cache.forEach((value, key) => {
        if(value.createdAt <= Date.now() - this.#interval){
            this.#cache.delete(key);
        }
    });
  }
  #startReapLoop(): void{
    const res = setInterval(() => {
        this.#reap();
    }, this.#interval);
    this.#reapIntervalId = res;
  }
  stopReapLoop():void{
    clearInterval(this.#reapIntervalId);
    this.#reapIntervalId = undefined;
  }
}