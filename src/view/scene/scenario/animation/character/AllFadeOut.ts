import {Display} from "../../Display";
import {ICharacterAnimation} from "./ICharacterAnimation";

export class AllFadeOut implements ICharacterAnimation {

    async executeAsync(display: Display) {
        return await display.allFadeOutAsync();
    }

}
