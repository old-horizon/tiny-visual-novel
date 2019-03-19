import {AnimationTypes} from "../../../../../model/scenario/AnimationTypes";
import {AllFadeOut} from "./AllFadeOut";
import {AppearBottom} from "./AppearBottom";
import {AppearLeft} from "./AppearLeft";
import {AppearRight} from "./AppearRight";
import {Depress} from "./Depress";
import {ExitLeft} from "./ExitLeft";
import {FadeOut} from "./FadeOut";
import {ICharacterAnimation} from "./ICharacterAnimation";
import {Jump} from "./Jump";
import {Nod} from "./Nod";
import {Shock} from "./Shock";
import {Transition} from "./Transition";

export class CharacterAnimationFactory {

    private static readonly ANIMATIONS = new Map<string, new() => ICharacterAnimation>()
        .set(AnimationTypes.Character.ALL_FADE_OUT, AllFadeOut)
        .set(AnimationTypes.Character.FADE_OUT, FadeOut)
        .set(AnimationTypes.Character.APPEAR_BOTTOM, AppearBottom)
        .set(AnimationTypes.Character.APPEAR_RIGHT, AppearRight)
        .set(AnimationTypes.Character.APPEAR_LEFT, AppearLeft)
        .set(AnimationTypes.Character.EXIT_LEFT, ExitLeft)
        .set(AnimationTypes.Character.TRANSITION, Transition)
        .set(AnimationTypes.Character.JUMP, Jump)
        .set(AnimationTypes.Character.NOD, Nod)
        .set(AnimationTypes.Character.DEPRESS, Depress)
        .set(AnimationTypes.Character.SHOCK, Shock);

    private constructor() {
    }

    static newInstance(name: string) {
        const animation = CharacterAnimationFactory.ANIMATIONS.get(name);
        if (animation === undefined) {
            throw new Error(`Undefined character animation: ${name}`);
        }
        return new animation();
    }

}
