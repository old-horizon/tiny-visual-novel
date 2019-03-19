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
export class ItemEvent implements IEvent<Display>, IPreloadable {

    private readonly url: string;
    private readonly target: number;
    private readonly x: number;
    private readonly y: number;

    private image: Bitmap;

    constructor(element: Element) {
        this.url = element.getAttribute(IEvent.CommonKeys.URL);

        const target = element.getAttribute(IEvent.CommonKeys.TARGET);
        const x = element.getAttribute(IEvent.CommonKeys._X);
        const y = element.getAttribute(IEvent.CommonKeys._Y);

        this.target = NumberUtil.parseInt(target);
        this.x = NumberUtil.parseInt(x);
        this.y = NumberUtil.parseInt(y);
    }

    get type() {
        return EventTypes.BG;
    }

    async executeAsync(player: IScenarioPlayer<Display>) {
        const layer = player.display.getLayer(this.target);
        layer.addImage(this.image);
    }

    load(context: PreloadableContext) {
        context.getImage(this.url, data => {
            this.image = new Bitmap(data);
            this.image.x = this.x;
            this.image.y = this.y;
        });
    }

    onload() {
    }

}
