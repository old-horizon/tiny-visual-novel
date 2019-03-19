import {Display} from "../../Display";
import {ICharacterAnimation} from "./ICharacterAnimation";
import Bitmap = createjs.Bitmap;
import Tween = createjs.Tween;

export class AppearBottom implements ICharacterAnimation {

    async executeAsync(display: Display, target: number, image: Bitmap) {
        return new Promise<void>(resolve => {
            const destY = image.y;
            image.alpha = 0;
            image.y = destY + 600;
            const layer = display.getLayer(target);
            layer.setImage(image);
            Tween.get(image)
                .wait(100)
                .to({alpha: 1, y: destY}, 400)
                .call(() => resolve());
        });
    }

}
