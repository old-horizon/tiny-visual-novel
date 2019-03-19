import {Assets} from "../../../../asset/Assets";
import {IChoice} from "../../../../model/scenario/IChoice";
import {BitmapUtil} from "../../../../util/BitmapUtil";
import {IPreloadable} from "../../../../util/loader/IPreloadable";
import {Preload} from "../../../../util/loader/Preload";
import {PreloadableContext} from "../../../../util/loader/PreloadableContext";
import {AbstractButton} from "../../../common/AbstractButton";
import {StyledText} from "../../../common/StyledText";
import Bitmap = createjs.Bitmap;
import Container = createjs.Container;
import Text = createjs.Text;
import Tween = createjs.Tween;

@Preload
export class ChoiceButton extends AbstractButton implements IPreloadable {

    private static readonly IMAGE = {
        PATH: Assets.Image.SCENARIO.CHOICE,
        AREA: {
            BACKGROUND: {x: 0, y: 0, w: 420, h: 71},
            HOVER: {x: 0, y: 143, w: 420, h: 72},
            CLICK: {x: 0, y: 71, w: 420, h: 72},
        },
    };

    private static readonly TEXT = {
        X: 66,
        Y: 36,
        SIZE: 22,
        COLOR: {
            RED: "rgb(251, 121, 185)",
            BLUE: "rgb(154, 192, 250)",
        },
    };

    protected readonly overlay = true;

    private readonly index: number;
    private readonly description: Text;

    static red(conf: ChoiceButton.Configuration) {
        return new ChoiceButton(ChoiceButton.TEXT.COLOR.RED, conf);
    }

    static blue(conf: ChoiceButton.Configuration) {
        return new ChoiceButton(ChoiceButton.TEXT.COLOR.BLUE, conf);
    }

    constructor(color: string, conf: ChoiceButton.Configuration) {
        super();
        this.x = conf.x;
        this.y = conf.y;
        this.index = conf.index;
        this.description = ChoiceButton.createTextField(color);
    }

    onMouseOut() {
    }

    onMouseOver() {
    }

    onMouseDown() {
    }

    onClick() {
    }

    showOptionAsync(choice: IChoice, container: Container) {
        return new Promise<string>(resolve => {
            this.fadeIn(container, () => {
                this.description.text = `${this.index}.${choice.text}`;
                const target = choice.target;
                this.onClick = () => resolve(target);
            });
        });
    }

    private fadeIn(container: Container, callback: Function) {
        this.alpha = 0;
        this.scaleX = 0;
        this.scaleY = 0;
        this.description.visible = false;
        container.addChild(this);
        Tween.get(this)
            .to({alpha: 1, scaleX: 1, scaleY: 1}, 150)
            .call(() => {
                this.description.visible = true;
                callback();
            });
    }

    dispose() {
        Tween.get(this).to({alpha: 0}, 300)
            .call(() => this.parent.removeChild(this));
    }

    private static createTextField(color: string) {
        const text = StyledText.newInstance(ChoiceButton.TEXT.SIZE, color);
        text.x = ChoiceButton.TEXT.X;
        text.y = ChoiceButton.TEXT.Y;
        text.textBaseline = "middle";
        return text;
    }

    load(context: PreloadableContext) {
        context.getImage(ChoiceButton.IMAGE.PATH, data => {
            const images = new Bitmap(data);
            this.image = BitmapUtil.clip(images, ChoiceButton.IMAGE.AREA.BACKGROUND);
            this.hoverImage = BitmapUtil.clip(images, ChoiceButton.IMAGE.AREA.HOVER);
            this.clickImage = BitmapUtil.clip(images, ChoiceButton.IMAGE.AREA.CLICK);
        });
    }

    onload() {
        this.centering();
        this.initImage();
        this.addChild(this.description);
        this.setupListeners();
    }

    private centering() {
        const bounds = this.image.getBounds();
        const offsetX = bounds.width / 2;
        const offsetY = bounds.height / 2;

        this.regX = offsetX;
        this.regY = offsetY;
        this.x += offsetX;
        this.y += offsetY;
    }

}

export namespace ChoiceButton {

    export interface Configuration {

        x: number;

        y: number;

        index: number;

    }

}
