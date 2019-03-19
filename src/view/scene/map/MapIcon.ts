import {Assets} from "../../../asset/Assets";
import {BitmapUtil} from "../../../util/BitmapUtil";
import {IPreloadable} from "../../../util/loader/IPreloadable";
import {Preload} from "../../../util/loader/Preload";
import {PreloadableContext} from "../../../util/loader/PreloadableContext";
import {AbstractButton} from "../../common/AbstractButton";
import Bitmap = createjs.Bitmap;
import Container = createjs.Container;
import Tween = createjs.Tween;

export class MapIcon extends AbstractButton {

    private readonly hover = new Hover();

    private callback: Function;

    constructor(conf: MapIcon.Configuration) {
        super();
        this.x = conf.x;
        this.y = conf.y;
        this.image = conf.image;
        this.hoverImage = conf.hoverImage;
        this.clickImage = conf.clickImage;
        this.initImage();
        this.setupListeners();
    }

    onMouseOut() {
        if (this.callback === undefined) {
            this.hover.visible = false;
        }
    }

    onMouseOver() {
        if (this.callback === undefined) {
            this.hover.visible = true;
        }
    }

    onMouseDown() {
    }

    onClick() {
        if (this.callback !== undefined) {
            this.callback();
        } else {
            this.hover.visible = true;
        }
    }

    activate(callback: Function) {
        this.callback = callback;
    }

    init() {
        this.callback !== undefined ? this.hover.opened() : this.hover.closed();
        this.addChild(this.hover);
    }

}

export namespace MapIcon {

    export interface Configuration {

        x: number;

        y: number;

        image: Bitmap;

        hoverImage: Bitmap;

        clickImage: Bitmap;

    }

}

@Preload
class Hover extends Container implements IPreloadable {

    private static readonly IMAGE = {
        PATH: Assets.Image.MAP.HOVER,
        AREA: {
            OPEN: {x: 172, y: 0, w: 48, h: 29},
            CLOSE: {x: 0, y: 0, w: 172, h: 51},
        },
    };

    private static readonly OPEN = {
        Y: {
            FROM: 5,
            TO: -5,
        },
        DURATION: 750,
    };

    private static readonly CLOSE = {
        X: -34,
    };

    private openImage: Bitmap;
    private closeImage: Bitmap;

    opened() {
        this.openImage.y = Hover.OPEN.Y.FROM;
        Tween.get(this.openImage, {loop: true})
            .to({y: Hover.OPEN.Y.TO}, Hover.OPEN.DURATION)
            .to({y: Hover.OPEN.Y.FROM}, Hover.OPEN.DURATION);
        this.addChild(this.openImage);
    }

    closed() {
        this.visible = false;
        this.closeImage.x = Hover.CLOSE.X;
        this.addChild(this.closeImage);
    }

    load(context: PreloadableContext) {
        context.getImage(Hover.IMAGE.PATH, data => {
            const images = new Bitmap(data);
            this.openImage = BitmapUtil.clip(images, Hover.IMAGE.AREA.OPEN);
            this.closeImage = BitmapUtil.clip(images, Hover.IMAGE.AREA.CLOSE);
        });
    }

    onload() {
    }

}
