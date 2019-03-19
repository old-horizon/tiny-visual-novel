import {EventTypes} from "../../../../model/scenario/EventTypes";
import {IEvent} from "../../../../model/scenario/IEvent";
import {IScenarioPlayer} from "../../../../model/scenario/IScenarioPlayer";
import {IPreloadable} from "../../../../util/loader/IPreloadable";
import {Preload} from "../../../../util/loader/Preload";
import {PreloadableContext} from "../../../../util/loader/PreloadableContext";
import {Display} from "../Display";
import Bitmap = createjs.Bitmap;

@Preload
export class BgEvent implements IEvent<Display>, IPreloadable {

    private readonly url: string;
    private readonly name: string;

    private background: Bitmap;

    constructor(element: Element) {
        this.url = element.getAttribute(IEvent.CommonKeys.URL);
        this.name = element.getAttribute(IEvent.CommonKeys.NAME);
    }

    get type() {
        return EventTypes.BG;
    }

    async executeAsync(player: IScenarioPlayer<Display>) {
        player.location = this.name;
        player.display.background = this.background;
    }

    load(context: PreloadableContext) {
        context.getImage(this.url, data => this.background = new Bitmap(data));
    }

    onload() {
    }

}
