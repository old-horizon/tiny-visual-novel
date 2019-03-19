import {IPreloadable} from "./IPreloadable";
import {Preloader} from "./Preloader";

export function Preload<T extends IPreloadable>(constructor: new(...args: any[]) => T): any {
    const proxy = (...args: any[]): T => {
        const instance = new constructor(...args);
        Preloader.register(instance);
        return instance;
    };
    return Object.assign(proxy, constructor);
}
