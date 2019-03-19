import {IEvent} from "../../../../model/scenario/IEvent";
import {Display} from "../Display";

export class AnchorEvent implements IEvent<Display> {

    readonly type: string;

    constructor(element: Element) {
        this.type = element.getAttribute(IEvent.CommonKeys.TYPE);
    }

    async executeAsync() {
    }

}
