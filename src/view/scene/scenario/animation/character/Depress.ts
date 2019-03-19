import {Display} from "../../Display";
import {ICharacterAnimation} from "./ICharacterAnimation";
import Tween = createjs.Tween;

export class Depress implements ICharacterAnimation {

    async executeAsync(display: Display, target: number) {
        const layer = display.getLayer(target);
        Tween.get(layer)
            .to({y: layer.y + 15}, 500);
    }

}
