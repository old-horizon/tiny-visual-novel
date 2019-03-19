import {Display} from "../../Display";
import {ICharacterAnimation} from "./ICharacterAnimation";
import Tween = createjs.Tween;

export class Shock implements ICharacterAnimation {

    async executeAsync(display: Display, target: number,) {
        const layer = display.getLayer(target);
        const destX = layer.x;
        Tween.get(layer)
            .to({x: destX + 7}, 60)
            .to({x: destX - 7}, 60)
            .to({x: destX + 7}, 60)
            .to({x: destX - 7}, 60)
            .to({x: destX + 7}, 60)
            .to({x: destX - 7}, 60)
            .to({x: destX}, 60);
    }

}
