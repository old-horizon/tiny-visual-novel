import {Display} from "../../Display";
import {ICharacterAnimation} from "./ICharacterAnimation";

export class FadeOut implements ICharacterAnimation {

    async executeAsync(display: Display, target: number) {
        await display.getLayer(target).fadeOutAsync();
    }

}
