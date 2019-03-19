import {EventTypes} from "../../../../model/scenario/EventTypes";
import {IEvent} from "../../../../model/scenario/IEvent";
import {IScenarioPlayer} from "../../../../model/scenario/IScenarioPlayer";
import {IPreloadable} from "../../../../util/loader/IPreloadable";
import {Preload} from "../../../../util/loader/Preload";
import {PreloadableContext} from "../../../../util/loader/PreloadableContext";
import {NumberUtil} from "../../../../util/NumberUtil";
import {Display} from "../Display";
import Bitmap = createjs.Bitmap;

@Preload
export class CharaEvent implements IEvent<Display>, IPreloadable {

    private readonly url: string;
    private readonly animation: string;
    private readonly target: number;

    private image: Bitmap;

    constructor(element: Element) {
        this.url = element.getAttribute(IEvent.CommonKeys.URL);
        this.animation = element.getAttribute(CharaEvent.Keys.ANIMATION);
        const target = element.getAttribute(IEvent.CommonKeys.TARGET);
        if (target !== null) {
            this.target = NumberUtil.parseInt(target);
        }
    }

    get type() {
        return EventTypes.CHARA;
    }

    async executeAsync(player: IScenarioPlayer<Display>) {
        await player.display.animateCharacterAsync(this.image, this.animation, this.target);
    }

    load(context: PreloadableContext) {
        if (this.url === null) {
            return;
        }
        context.getImage(this.url, data => this.image = new Bitmap(data));
    }

    onload() {
    }

}

export namespace CharaEvent {

    export class Keys {

        static readonly ANIMATION = "animation";

        private constructor() {
        }

    }

}
