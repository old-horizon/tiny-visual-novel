import {EventTypes} from "../../../../model/scenario/EventTypes";
import {IChoice} from "../../../../model/scenario/IChoice";
import {IEvent} from "../../../../model/scenario/IEvent";
import {IScenarioPlayer} from "../../../../model/scenario/IScenarioPlayer";
import {Display} from "../Display";

export class Choice2Event implements IEvent<Display> {

    private readonly text: string;
    private readonly c01: string;
    private readonly c02: string;
    private readonly name: string;
    private readonly a: string;
    private readonly b: string;

    constructor(element: Element) {
        this.text = element.getAttribute(IEvent.CommonKeys.TEXT);
        this.c01 = element.getAttribute(Choice2Event.Keys.C01);
        this.c02 = element.getAttribute(Choice2Event.Keys.C02);
        this.name = element.getAttribute(IEvent.CommonKeys.NAME);
        this.a = element.getAttribute(Choice2Event.Keys.A);
        this.b = element.getAttribute(Choice2Event.Keys.B);
    }

    get type() {
        return EventTypes.CHOICE2;
    }

    async executeAsync(player: IScenarioPlayer<Display>) {
        const color = Choice2Event.getTextColor(this.text);
        player.showMessage(this.text, this.name, color);

        const first = Choice2Event.toChoice(this.c01, this.a);
        const second = Choice2Event.toChoice(this.c02, this.b);
        await player.choiceAsync(first, second);
    }

    private static getTextColor(text: string) {
        const match = text.match(/<font color="(.*?)">/);
        if (match !== null) {
            return match[1];
        }
        throw new Error(`Cannot get text color: text=${text}`);
    }

    private static toChoice(text: string, target: string) {
        return <IChoice>{
            text,
            target,
        };
    }

}

export namespace Choice2Event {

    export class Keys {

        static readonly A = "A";
        static readonly B = "B";
        static readonly C01 = "c01";
        static readonly C02 = "c02";

        private constructor() {
        }
    }

}
