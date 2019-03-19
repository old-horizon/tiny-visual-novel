import Bitmap = createjs.Bitmap;
import {Display} from "../../Display";

export interface ICharacterAnimation {

    executeAsync(display: Display, target: number, image: Bitmap): Promise<void>;

}
