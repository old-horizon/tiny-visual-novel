import {Assets} from "../../../asset/Assets";
import {BitmapUtil} from "../../../util/BitmapUtil";
import {IPreloadable} from "../../../util/loader/IPreloadable";
import {Preload} from "../../../util/loader/Preload";
import {PreloadableContext} from "../../../util/loader/PreloadableContext";
import {SleepAsync} from "../../../util/SleepAsync";
import {StyledText} from "../../common/StyledText";
import Bitmap = createjs.Bitmap;
import Container = createjs.Container;
import Shape = createjs.Shape;
import Text = createjs.Text;
import Tween = createjs.Tween;

export class MessageWindow extends Container {

    static readonly FONT = {
        SIZE: 22,
        COLOR: "rgb(252, 252, 252)",
    };

    private static readonly BACKGROUND = {
        X: 0,
        Y: 436,
    };

    private static readonly HIT_AREA = {
        X: 0,
        Y: 36,
        WIDTH: 800,
        HEIGHT: 564,
        COLOR: "rgb(0, 0, 0)",
    };

    private static readonly WAIT = 12;

    private readonly nameField = new NameField();
    private readonly messageField = new MessageField();
    private readonly waitIcon = new WaitIcon();
    private readonly background: Bitmap;

    constructor(background: Bitmap) {
        super();
        this.background = background;
        this.background.x = MessageWindow.BACKGROUND.X;
        this.background.y = MessageWindow.BACKGROUND.Y;
        this.hitArea = MessageWindow.createHitAreaRect();

        this.addChild(this.background);
        this.addChild(this.nameField);
        this.addChild(this.messageField);
        this.addChild(this.waitIcon);
    }

    show(text: string, name: string, color?: string) {
        this.nameField.value = name;
        this.messageField.color = color || MessageWindow.FONT.COLOR;
        this.messageField.value = MessageWindow.convertHtmlTags(text);
    }

    async typeAsync(text: string, name: string) {
        this.nameField.value = name;
        this.messageField.color = MessageWindow.FONT.COLOR;

        this.waitIcon.hide();
        const displayText = MessageWindow.convertHtmlTags(text);

        for (let i = 1, length = displayText.length; i <= length; i++) {
            this.messageField.value = displayText.slice(0, i);
            await SleepAsync.millis(MessageWindow.WAIT);
        }

        this.waitIcon.show();
        await this.waitClickAsync();
    }

    private waitClickAsync() {
        return new Promise<void>(resolve => {
            const callback = () => {
                this.removeEventListener("click", callback);
                resolve();
            };
            this.addEventListener("click", callback);
        });
    }

    private static createHitAreaRect() {
        const rect = new Shape();
        rect.graphics
            .beginFill(MessageWindow.HIT_AREA.COLOR)
            .drawRect(MessageWindow.HIT_AREA.X, MessageWindow.HIT_AREA.Y,
                MessageWindow.HIT_AREA.WIDTH, MessageWindow.HIT_AREA.HEIGHT);
        return rect;
    }

    private static convertHtmlTags(value: string) {
        return value.replace(/<br>/g, "\n").replace(/<.*>/g, "");
    }

}

class NameField extends Container {

    private static readonly X = 86;
    private static readonly Y = 456;
    private static readonly WIDTH = 246;
    private static readonly HEIGHT = 36;
    private static readonly BACKGROUND_COLOR = "rgba(0, 0, 0, 0)";

    private readonly field: Text;

    constructor() {
        super();
        this.x = NameField.X;
        this.y = NameField.Y;
        this.field = NameField.createTextField();
        this.addChild(NameField.createBackgroundRect());
        this.addChild(this.field);
    }

    set value(value: string) {
        this.field.text = value;
    }

    private static createTextField() {
        const text = StyledText.newInstance(MessageWindow.FONT.SIZE, MessageWindow.FONT.COLOR);
        text.x = NameField.WIDTH / 2;
        text.y = NameField.HEIGHT / 2;
        text.textAlign = "center";
        text.textBaseline = "middle";
        return text;
    }

    private static createBackgroundRect() {
        const rect = new Shape();
        rect.graphics.beginFill(NameField.BACKGROUND_COLOR)
            .drawRect(0, 0, NameField.WIDTH, NameField.HEIGHT);
        return rect;
    }

}

class MessageField extends Container {

    private static readonly X = 134;
    private static readonly Y = 504;

    private readonly field: Text;

    constructor() {
        super();
        this.field = MessageField.createTextField();
        this.addChild(this.field);
    }

    set color(color: string) {
        this.field.color = color;
    }

    set value(value: string) {
        this.field.text = value;
    }

    private static createTextField() {
        const text = StyledText.newInstance(MessageWindow.FONT.SIZE);
        text.x = MessageField.X;
        text.y = MessageField.Y;
        return text;
    }

}

@Preload
class WaitIcon extends Container implements IPreloadable {

    private static readonly X = 680;
    private static readonly Y = 457;
    private static readonly WAIT = 500;

    private static readonly IMAGE = {
        PATH: Assets.Image.SCENARIO.WAIT,
        AREA: {
            YELLOW: {x: 0, y: 40, w: 32, h: 40},
            RED: {x: 0, y: 0, w: 32, h: 40},
        },
    };

    private yellow: Bitmap;
    private red: Bitmap;

    constructor() {
        super();
        this.x = WaitIcon.X;
        this.y = WaitIcon.Y;
    }

    load(context: PreloadableContext) {
        context.getImage(WaitIcon.IMAGE.PATH, data => {
            const images = new Bitmap(data);
            this.yellow = BitmapUtil.clip(images, WaitIcon.IMAGE.AREA.YELLOW);
            this.red = BitmapUtil.clip(images, WaitIcon.IMAGE.AREA.RED);
        });
    }

    onload() {
        this.addChild(this.yellow);
        this.addChild(this.red);
        Tween.get(this.red, {loop: true})
            .wait(WaitIcon.WAIT)
            .set({visible: false})
            .wait(WaitIcon.WAIT)
            .set({visible: true});
    }

    show() {
        this.visible = true;
    }

    hide() {
        this.visible = false;
    }

}
