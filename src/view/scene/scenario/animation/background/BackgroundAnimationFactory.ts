import {AnimationTypes} from "../../../../../model/scenario/AnimationTypes";
import {IBackgroundAnimation} from "./IBackgroundAnimation";
import {Shock} from "./Shock";

export class BackgroundAnimationFactory {

    private static readonly ANIMATIONS = new Map<string, new() => IBackgroundAnimation>()
        .set(AnimationTypes.Background.SHOCK, Shock);

    private constructor() {
    }

    static newInstance(name: string) {
        const animation = BackgroundAnimationFactory.ANIMATIONS.get(name);
        if (animation === undefined) {
            throw new Error(`Undefined background animation: ${name}`);
        }
        return new animation();
    }

}
