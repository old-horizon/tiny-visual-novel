import {IScenarioPlayer} from "./IScenarioPlayer";

export interface IEvent<T> {

    type: string;

    executeAsync(player: IScenarioPlayer<T>): Promise<void>;

}

export namespace IEvent {

    export class CommonKeys {

        static readonly _X = "_x";
        static readonly _Y = "_y";
        static readonly NAME = "name";
        static readonly TARGET = "target";
        static readonly TYPE = "type";
        static readonly TEXT = "text";
        static readonly URL = "url";

        private constructor() {
        }

    }

}
