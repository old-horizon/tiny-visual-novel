import {EventTypes} from "../../../../model/scenario/EventTypes";
import {IEvent} from "../../../../model/scenario/IEvent";
import {IScenarioPlayer} from "../../../../model/scenario/IScenarioPlayer";
import {Display} from "../Display";

export class TextEvent implements IEvent<Display> {

    private readonly text: string;
    private readonly name: string;

    constructor(element: Element) {
        this.text = element.getAttribute(IEvent.CommonKeys.TEXT);
        this.name = element.getAttribute(IEvent.CommonKeys.NAME);
    }

    get type() {
        return EventTypes.TEXT;
    }

    async executeAsync(player: IScenarioPlayer<Display>) {
        await player.typeMessageAsync(this.text, this.name);
    }

}
