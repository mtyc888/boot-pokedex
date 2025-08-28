export class Cache {
    #cache = new Map();
    #reapIntervalId = undefined;
    #interval;
    constructor(interval) {
        this.#interval = interval;
        this.#startReapLoop();
    }
    add(key, val) {
        const timestampMs = Date.now();
        const cacheObj = {
            createdAt: timestampMs,
            val: val
        };
        this.#cache.set(key, cacheObj);
    }
    get(key) {
        const entry = this.#cache.get(key);
        if (!entry) {
            return undefined;
        }
        return entry.val;
    }
    #reap() {
        this.#cache.forEach((value, key) => {
            if (value.createdAt <= Date.now() - this.#interval) {
                this.#cache.delete(key);
            }
        });
    }
    #startReapLoop() {
        const res = setInterval(() => {
            this.#reap();
        }, this.#interval);
        this.#reapIntervalId = res;
    }
    stopReapLoop() {
        clearInterval(this.#reapIntervalId);
        this.#reapIntervalId = undefined;
    }
}
