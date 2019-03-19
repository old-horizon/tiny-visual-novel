import {IEvent} from "../../../../model/scenario/IEvent";
import {IScenarioPlayer} from "../../../../model/scenario/IScenarioPlayer";
import {Display} from "../Display";

export class BgAnimationEvent implements IEvent<Display> {

    readonly type: string;

    private readonly animation: string;

    constructor(element: Element, animation: string) {
        this.type = element.getAttribute(IEvent.CommonKeys.TYPE);
        this.animation = animation;
    }

    async executeAsync(player: IScenarioPlayer<Display>) {
        await player.display.animateBackgroundAsync(this.animation);
    }

}
