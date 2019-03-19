import {Display} from "../../Display";
import {ICharacterAnimation} from "./ICharacterAnimation";
import Tween = createjs.Tween;

export class ExitLeft implements ICharacterAnimation {

    async executeAsync(display: Display, target: number) {
        return new Promise<void>(resolve => {
            const layer = display.getLayer(target);
            const destX = layer.x - 200;
            Tween.get(layer)
                .to({alpha: 0, x: destX}, 300)
                .call(() => resolve());
        });
    }

}
