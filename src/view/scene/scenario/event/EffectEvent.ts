import {Assets} from "../../../../asset/Assets";
import {EventTypes} from "../../../../model/scenario/EventTypes";
import {IEffect} from "../../../../model/scenario/IEffect";
import {IEvent} from "../../../../model/scenario/IEvent";
import {IScenarioPlayer} from "../../../../model/scenario/IScenarioPlayer";
import {IPreloadable} from "../../../../util/loader/IPreloadable";
import {Preload} from "../../../../util/loader/Preload";
import {PreloadableContext} from "../../../../util/loader/PreloadableContext";
import {NumberUtil} from "../../../../util/NumberUtil";
import {Display} from "../Display";
import Bitmap = createjs.Bitmap;
import DisplayObject = createjs.DisplayObject;
import Tween = createjs.Tween;

@Preload
export class EffectEvent implements IEvent<Display>, IPreloadable {

    private static readonly EFFECTS: IEffectDefinition[] = [
        {
            swf: Assets.Image.SCENARIO.EVENT.SWEAT.SWF,
            png: Assets.Image.SCENARIO.EVENT.SWEAT.PNG,
            effect: {
                init: image => {
                    image.x += -134;
                    image.y += -126;
                    image.alpha = 0;
                },
                animateAsync: image =>
                    new Promise<void>(resolve => {
                        Tween.get(image)
                            .to({alpha: 1}, 130);
                        Tween.get(image)
                            .to({y: image.y + 42}, 500)
                            .call(() => resolve());
                    }),
            },
        },
    ];

    private readonly url: string;
    private readonly target: number;
    private readonly x: number;
    private readonly y: number;

    private image: Bitmap;
    private effect: IEffect<DisplayObject>;

    constructor(element: Element) {
        this.url = element.getAttribute(IEvent.CommonKeys.URL);

        const target = element.getAttribute(IEvent.CommonKeys.TARGET);
        const x = element.getAttribute(IEvent.CommonKeys._X);
        const y = element.getAttribute(IEvent.CommonKeys._Y);

        this.target = NumberUtil.parseInt(target);
        this.x = NumberUtil.parseInt(x);
        this.y = NumberUtil.parseInt(y);
    }

    get type() {
        return EventTypes.EFFECT;
    }

    async executeAsync(player: IScenarioPlayer<Display>) {
        if (this.effect === undefined) {
            return;
        }
        const layer = player.display.getLayer(this.target);
        await layer.addEffectAsync(this.image, this.effect);
    }

    load(context: PreloadableContext) {
        const definition = EffectEvent.EFFECTS.find(effect => effect.swf === this.url);
        if (definition === undefined) {
            console.warn(`Undefined effect: ${this.url}`);
            return;
        }
        this.effect = definition.effect;
        context.getImage(definition.png, data => {
            this.image = new Bitmap(data);
            this.image.x = this.x;
            this.image.y = this.y;
        });
    }

    onload() {
    }

}

interface IEffectDefinition {

    swf: string;

    png: string;

    effect: IEffect<DisplayObject>;

}
