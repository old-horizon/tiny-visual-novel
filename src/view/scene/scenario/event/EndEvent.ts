import {EventTypes} from "../../../../model/scenario/EventTypes";
import {IScenarioPlayer} from "../../../../model/scenario/IScenarioPlayer";
import {Display} from "../Display";
import {SaveEndEvent} from "./SaveEndEvent";

export class EndEvent extends SaveEndEvent {

    get type() {
        return EventTypes.END;
    }

    async executeAsync(player: IScenarioPlayer<Display>) {
        await super.executeAsync(player);
        player.end();
    }

}
