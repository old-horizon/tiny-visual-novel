import {IBackgroundAnimation} from "./IBackgroundAnimation";
import DisplayObject = createjs.DisplayObject;
import Tween = createjs.Tween;

export class Shock implements IBackgroundAnimation {

    async executeAsync(background: DisplayObject) {
        const destX = background.x;
        Tween.get(background)
            .to({scaleX: 1.05}, 10)
            .to({x: destX - 10}, 10)
            .to({x: destX + 7}, 60)
            .to({x: destX - 14}, 60)
            .to({x: destX + 14}, 60)
            .to({x: destX - 14}, 60)
            .to({x: destX + 14}, 60)
            .to({x: destX - 14}, 60)
            .to({x: destX + 7}, 60)
            .to({x: destX}, 10);
    }

}
