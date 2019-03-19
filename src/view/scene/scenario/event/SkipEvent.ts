import {EventTypes} from "../../../../model/scenario/EventTypes";
import {IEvent} from "../../../../model/scenario/IEvent";
import {IScenarioPlayer} from "../../../../model/scenario/IScenarioPlayer";
import {Display} from "../Display";

export class SkipEvent implements IEvent<Display> {

    private readonly skip: string;

    constructor(element: Element) {
        this.skip = element.getAttribute(SkipEvent.Keys.SKIP);
    }

    get type() {
        return EventTypes.SKIP;
    }

    async executeAsync(player: IScenarioPlayer<Display>) {
        player.jump(this.skip);
    }

}

export namespace SkipEvent {

    export class Keys {

        static readonly SKIP = "skip";

        private constructor() {
        }

    }

}
