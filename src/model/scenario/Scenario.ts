import {IEventFactory} from "./IEventFactory";

export class Scenario {

    private static readonly TAG = {
        SCENARIO_LIST: "scenario_list",
        EVENT: "event",
    };

    static parse<T>(document: XMLDocument, factory: IEventFactory<T>) {
        const scenarioList = document.getElementsByTagName(Scenario.TAG.SCENARIO_LIST)[0];
        const events = scenarioList.getElementsByTagName(Scenario.TAG.EVENT);
        return Array.from(events).map(event => factory(event));
    }

}
