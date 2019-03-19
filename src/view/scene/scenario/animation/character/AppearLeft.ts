import {Display} from "../../Display";
import {ICharacterAnimation} from "./ICharacterAnimation";
import Bitmap = createjs.Bitmap;
import Tween = createjs.Tween;

export class AppearLeft implements ICharacterAnimation {

    async executeAsync(display: Display, target: number, image: Bitmap) {
        return new Promise<void>(resolve => {
            const destX = image.x;
            image.alpha = 0;
            image.x = destX - 100;
            const layer = display.getLayer(target);
            layer.setImage(image);
            Tween.get(image)
                .wait(100)
                .to({alpha: 1, x: destX}, 200)
                .call(() => resolve());
        });
    }

}
