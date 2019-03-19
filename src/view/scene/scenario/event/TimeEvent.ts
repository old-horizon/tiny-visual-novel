import {EventTypes} from "../../../../model/scenario/EventTypes";
import {IEvent} from "../../../../model/scenario/IEvent";
import {NumberUtil} from "../../../../util/NumberUtil";
import {SleepAsync} from "../../../../util/SleepAsync";
import {Display} from "../Display";

export class TimeEvent implements IEvent<Display> {

    private readonly time: number;

    constructor(element: Element) {
        const time = element.getAttribute(TimeEvent.Keys.TIME);
        this.time = NumberUtil.parseInt(time);
    }

    get type() {
        return EventTypes.END;
    }

    async executeAsync() {
        await SleepAsync.seconds(this.time);
    }

}

export namespace TimeEvent {

    export class Keys {

        static readonly TIME = "time";

        private constructor() {
        }

    }

}
