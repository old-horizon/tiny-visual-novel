import {Display} from "../../Display";
import {ICharacterAnimation} from "./ICharacterAnimation";
import Bitmap = createjs.Bitmap;
import Tween = createjs.Tween;

export class Transition implements ICharacterAnimation {

    async executeAsync(display: Display, target: number, image: Bitmap) {
        return new Promise<void>(resolve => {
            image.alpha = 0;
            const layer = display.getLayer(target);
            layer.setImage(image);
            Tween.get(image)
                .wait(100)
                .to({alpha: 1}, 300)
                .call(() => resolve());
        });
    }

}
