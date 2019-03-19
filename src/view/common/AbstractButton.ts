import {ToggleButtonGroup} from "./ToggleButtonGroup";
import Bitmap = createjs.Bitmap;
import Container = createjs.Container;

export abstract class AbstractButton extends Container {

    protected image: Bitmap;
    protected hoverImage: Bitmap;
    protected clickImage: Bitmap;
    protected overlay = false;

    private hit = false;
    private pressed = false;
    private _toggleGroup: ToggleButtonGroup;

    abstract onMouseOut(): void;

    abstract onMouseOver(): void;

    abstract onMouseDown(): void;

    abstract onClick(): void;

    set toggleGroup(toggleGroup: ToggleButtonGroup) {
        toggleGroup.add(this);
        this._toggleGroup = toggleGroup;
    }

    protected initImage() {
        this.addChild(this.image);
        this.addChild(this.hoverImage);
        this.addChild(this.clickImage);
        this.setImage(Status.MOUSE_OUT);
    }

    protected setupListeners() {
        this.addEventListener("mouseout", () => this.mouseOut());
        this.addEventListener("mouseover", () => this.mouseOver());
        this.addEventListener("mousedown", () => this.mouseDown());
        this.addEventListener("pressup", () => this.pressUp());
    }

    mouseOut() {
        this.hit = false;
        this.setImage(Status.MOUSE_OUT);
        this.onMouseOut();
    }

    mouseOver() {
        this.hit = true;
        this.setImage(this.pressed ? Status.MOUSE_DOWN : Status.MOUSE_OVER);
        this.onMouseOver();
    }

    mouseDown() {
        this.hit = true;
        this.pressed = true;
        this.setImage(Status.MOUSE_DOWN);
        this.onMouseDown();
        if (this._toggleGroup !== undefined) {
            this._toggleGroup.toggle(this);
        }
    }

    pressUp() {
        this.pressed = false;
        this.setImage(this.hit ? Status.MOUSE_OVER : Status.MOUSE_OUT);
        if (this.hit) {
            this.onClick();
        }
    }

    private setImage(...status: Status[]) {
        const mouseOut = status.includes(Status.MOUSE_OUT);
        const mouseOver = status.includes(Status.MOUSE_OVER);
        const click = status.includes(Status.MOUSE_DOWN);

        this.image.visible = this.overlay || mouseOut;
        this.hoverImage.visible = mouseOver;
        this.clickImage.visible = click;
    }

}

const enum Status {

    MOUSE_OVER, MOUSE_OUT, MOUSE_DOWN

}
