export class Serials {

    private static readonly STORAGE_KEY = "serials";

    private readonly serials: SerialObject;

    constructor() {
        const json = localStorage.getItem(Serials.STORAGE_KEY);
        this.serials = json !== null ? JSON.parse(json) : {};
    }

    get(key: string) {
        return this.serials[key] || "NOT";
    }

    set(key: string, value: string) {
        this.serials[key] = value;
        const json = JSON.stringify(this.serials);
        localStorage.setItem(Serials.STORAGE_KEY, json);
    }

}

interface SerialObject {

    [key: string]: string;

}
