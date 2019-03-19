import {EventTypes} from "../../../../model/scenario/EventTypes";
import {IEvent} from "../../../../model/scenario/IEvent";
import {IScenarioPlayer} from "../../../../model/scenario/IScenarioPlayer";
import {Display} from "../Display";

export class SaveEndEvent implements IEvent<Display> {

    private readonly serial: string;
    private readonly save: string;

    constructor(element: Element) {
        this.serial = element.getAttribute(SaveEndEvent.Keys.SERIAL);
        this.save = element.getAttribute(SaveEndEvent.Keys.SAVE);
    }

    get type() {
        return EventTypes.SAVE_END;
    }

    async executeAsync(player: IScenarioPlayer<Display>) {
        player.saveSerial(this.serial, this.save);
    }

}

export namespace SaveEndEvent {

    export class Keys {

        static readonly SERIAL = "serial";
        static readonly SAVE = "save";

        private constructor() {
        }

    }

}
