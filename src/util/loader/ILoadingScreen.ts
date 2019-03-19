import {IPreloadable} from "./IPreloadable";

export interface ILoadingScreen extends IPreloadable {

    init(): void;

    progress(ratio: number): void;

    dispose(): void;

}
