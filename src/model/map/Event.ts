import {Serials} from "../Serials";

export class Event {

    private static readonly TAG = {
        EVENT_LIST: "eventlist",
        EVENT: "event",
        SCENARIO: "scenario",
        BUTTON: "button",
    };

    private static readonly ATTRIBUTE = {
        XML_FILE: "xmlfile",
        ID: "id",
    };

    public readonly xmlFile: string;
    public readonly id: string;

    private readonly conditions: Event.Conditions;

    static parse(document: XMLDocument) {
        const eventList = document.getElementsByTagName(Event.TAG.EVENT_LIST)[0];
        const events = eventList.getElementsByTagName(Event.TAG.EVENT);
        return Array.from(events).map(event => new Event(event));
    }

    private constructor(element: Element) {
        this.xmlFile = element.getElementsByTagName(Event.TAG.SCENARIO)[0].getAttribute(Event.ATTRIBUTE.XML_FILE);
        this.id = element.getElementsByTagName(Event.TAG.BUTTON)[0].getAttribute(Event.ATTRIBUTE.ID);
        this.conditions = new Event.Conditions(element);
    }

    getStatus(serials: Serials) {
        return this.conditions.getStatus(serials);
    }

}

export namespace Event {

    export const enum Status {
        OPEN, CLOSE
    }

    export class Conditions {

        private static readonly TAG = {
            OPEN: "open",
            CLOSE: "close",
        };

        private readonly open: Condition;
        private readonly close: Condition;

        constructor(element: Element) {
            this.open = new Condition(Conditions.TAG.OPEN, element);
            this.close = new Condition(Conditions.TAG.CLOSE, element);
        }

        getStatus(serials: Serials) {
            if (this.open.match(serials) && !this.close.match(serials)) {
                return Status.OPEN;
            }
            return Status.CLOSE;
        }

    }

    class Condition {

        private static readonly ATTRIBUTE = {
            TARGET_SERIAL: "targetSerial",
            CONDITION: "condition",
        };

        private readonly targetSerial: string;
        private readonly condition: string;

        constructor(tagName: string, element: Element) {
            const status = element.getElementsByTagName(tagName)[0];
            this.targetSerial = status.getAttribute(Condition.ATTRIBUTE.TARGET_SERIAL);
            this.condition = status.getAttribute(Condition.ATTRIBUTE.CONDITION);
        }

        match(serials: Serials) {
            return serials.get(this.targetSerial) === this.condition;
        }

    }

}
