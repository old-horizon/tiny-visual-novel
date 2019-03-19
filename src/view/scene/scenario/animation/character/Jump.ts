import {Display} from "../../Display";
import {ICharacterAnimation} from "./ICharacterAnimation";
import Tween = createjs.Tween;

export class Jump implements ICharacterAnimation {

    async executeAsync(display: Display, target: number) {
        const layer = display.getLayer(target);
        const destY = layer.y;
        Tween.get(layer)
            .to({y: destY - 24}, 100)
            .to({y: destY + 4}, 150)
            .to({y: destY}, 30);
    }

}
