import {PreloadableContext} from "./PreloadableContext";

export interface IPreloadable {

    load(context: PreloadableContext): void,

    onload(): void,

}
