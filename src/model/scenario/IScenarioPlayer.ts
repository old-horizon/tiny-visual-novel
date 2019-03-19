import {IChoice} from "./IChoice";

export interface IScenarioPlayer<T> {

    display: T;

    location: string;

    choiceAsync(first: IChoice, second: IChoice): void;

    jump(target: string): void;

    saveSerial(key: string, value: string): void;

    end(): void;

    showMessage(text: string, name: string, color?: string): void;

    typeMessageAsync(text: string, name: string): void;

}
