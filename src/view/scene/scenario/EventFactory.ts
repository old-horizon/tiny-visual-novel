import {AnimationTypes} from "../../../model/scenario/AnimationTypes";
import {EventTypes} from "../../../model/scenario/EventTypes";
import {IEvent} from "../../../model/scenario/IEvent";
import {IEventFactory} from "../../../model/scenario/IEventFactory";
import {Display} from "./Display";
import {AnchorEvent} from "./event/AnchorEvent";
import {BgAnimationEvent} from "./event/BgAnimationEvent";
import {BgEvent} from "./event/BgEvent";
import {CharaEvent} from "./event/CharaEvent";
import {Choice2Event} from "./event/Choice2Event";
import {EffectEvent} from "./event/EffectEvent";
import {EndEvent} from "./event/EndEvent";
import {ItemEvent} from "./event/ItemEvent";
import {SaveEndEvent} from "./event/SaveEndEvent";
import {SkipEvent} from "./event/SkipEvent";
import {TextEvent} from "./event/TextEvent";
import {TimeEvent} from "./event/TimeEvent";

export class EventFactory {

    private static readonly EVENTS = new Map<string, IEventFactory<Display>>()
        .set(EventTypes.BG, element => new BgEvent(element))
        .set(EventTypes.BG_MOVING_SHOCK, element => new BgAnimationEvent(element, AnimationTypes.Background.SHOCK))
        .set(EventTypes.CHARA, element => new CharaEvent(element))
        .set(EventTypes.CHOICE2, element => new Choice2Event(element))
        .set(EventTypes.EFFECT, element => new EffectEvent(element))
        .set(EventTypes.END, element => new EndEvent(element))
        .set(EventTypes.ITEM, element => new ItemEvent(element))
        .set(EventTypes.SAVE_END, element => new SaveEndEvent(element))
        .set(EventTypes.SKIP, element => new SkipEvent(element))
        .set(EventTypes.TEXT, element => new TextEvent(element))
        .set(EventTypes.TIME, element => new TimeEvent(element));

    static newInstance(element: Element): IEvent<Display> {
        const type = element.getAttribute(IEvent.CommonKeys.TYPE);
        const event = EventFactory.EVENTS.get(type);
        if (event === undefined) {
            return new AnchorEvent(element);
        }
        return event(element);
    }

    private constructor() {
    }

}
