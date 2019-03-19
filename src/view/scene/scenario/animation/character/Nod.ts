import {Display} from "../../Display";
import {ICharacterAnimation} from "./ICharacterAnimation";
import Tween = createjs.Tween;

export class Nod implements ICharacterAnimation {

    async executeAsync(display: Display, target: number) {
        const layer = display.getLayer(target);
        const destY = layer.y;
        Tween.get(layer)
            .to({y: destY + 10}, 150)
            .to({y: destY}, 300);
    }

}
