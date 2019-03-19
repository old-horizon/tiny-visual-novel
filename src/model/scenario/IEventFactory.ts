import {IEvent} from "./IEvent";

export interface IEventFactory<T> {

    (element: Element): IEvent<T>;

}
