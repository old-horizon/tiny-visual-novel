import {Assets} from "../../../asset/Assets";
import {IChoice} from "../../../model/scenario/IChoice";
import {IEvent} from "../../../model/scenario/IEvent";
import {IScenarioPlayer} from "../../../model/scenario/IScenarioPlayer";
import {Scenario} from "../../../model/scenario/Scenario";
import {Serials} from "../../../model/Serials";
import {BitmapUtil} from "../../../util/BitmapUtil";
import {IPreloadable} from "../../../util/loader/IPreloadable";
import {Preload} from "../../../util/loader/Preload";
import {PreloadableContext} from "../../../util/loader/PreloadableContext";
import {AbstractScene} from "../../common/AbstractScene";
import {StyledText} from "../../common/StyledText";
import {MapScene} from "../map/MapScene";
import {ChoiceButtons} from "./choice/ChoiceButtons";
import {Display} from "./Display";
import {EventFactory} from "./EventFactory";
import {MessageWindow} from "./MessageWindow";
import Bitmap = createjs.Bitmap;
import Container = createjs.Container;
import DisplayObject = createjs.DisplayObject;
import Text = createjs.Text;

@Preload
export class ScenarioScene extends AbstractScene implements IScenarioPlayer<Display>, IPreloadable {

    private static readonly EVENT_FACTORY = EventFactory.newInstance;

    private static readonly IMAGE = {
        PATH: Assets.Image.SCENARIO.PANEL,
        AREA: {
            HEADER: {x: 0, y: 0, w: 800, h: 36},
            MESSAGE_WINDOW: {x: 0, y: 36, w: 800, h: 164},
        },
    };

    readonly display = new Display();

    private readonly serials: Serials;
    private readonly xmlFile: string;

    private readonly choiceButtons = new ChoiceButtons();

    private header: Header;
    private messageWindow: MessageWindow;

    private events: IEvent<Display>[];
    private queue: IEvent<Display>[];

    constructor(serials: Serials, xmlFile: string) {
        super();
        this.serials = serials;
        this.xmlFile = xmlFile;
    }

    load(context: PreloadableContext) {
        context.getXml(this.xmlFile, data => this.events = Scenario.parse(data, ScenarioScene.EVENT_FACTORY));
        context.getImage(ScenarioScene.IMAGE.PATH, data => {
            const images = new Bitmap(data);
            const headerImage = BitmapUtil.clip(images, ScenarioScene.IMAGE.AREA.HEADER);
            const messageWindowImage = BitmapUtil.clip(images, ScenarioScene.IMAGE.AREA.MESSAGE_WINDOW);

            this.header = new Header(headerImage);
            this.messageWindow = new MessageWindow(messageWindowImage);
        });
    }

    onload() {
    }

    init() {
        this.addChild(this.display);
        this.addChild(this.header);
        this.addChild(this.messageWindow);
        this.addChild(this.choiceButtons);
        (async () => this.play())();
    }

    private async play() {
        this.queue = this.events.concat();
        while (this.queue.length > 0) {
            const event = this.queue.shift();
            if (event === undefined) {
                break;
            }
            await event.executeAsync(this);
        }
        await this.backToMap();
    }

    private async backToMap() {
        const mapScene = new MapScene(this.serials);
        await this.replaceScene(mapScene);
    }

    set location(value: string) {
        this.header.value = value;
    }

    async choiceAsync(first: IChoice, second: IChoice) {
        const target = await this.choiceButtons.choiceAsync(first, second);
        this.jump(target);
    }

    jump(target: string) {
        const index = this.events.findIndex(event => event.type === target);
        if (index === -1) {
            throw new Error(`Event which type is ${target} does not exist.`);
        }
        this.queue = this.events.slice(index);
    }

    saveSerial(key: string, value: string) {
        this.serials.set(key, value);
    }

    end() {
        this.queue.length = 0;
    }

    showMessage(text: string, name: string, color?: string) {
        this.messageWindow.show(text, name, color);
    }

    async typeMessageAsync(text: string, name: string) {
        await this.messageWindow.typeAsync(text, name);
    }

}

class Header extends Container {

    private static readonly X = 0;
    private static readonly Y = 0;
    private static readonly FONT = {
        SIZE: 16,
        COLOR: "rgb(167, 109, 12)",
    };

    private readonly background: Bitmap;

    private readonly field: Text;

    constructor(background: Bitmap) {
        super();
        this.x = Header.X;
        this.y = Header.Y;
        this.background = background;
        this.field = Header.createTextField(this.background);

        this.addChild(this.background);
        this.addChild(this.field);
    }

    set value(value: string) {
        this.field.text = value;
    }

    private static createTextField(parent: DisplayObject) {
        const parentBounds = parent.getBounds();
        const text = StyledText.newInstance(Header.FONT.SIZE, Header.FONT.COLOR);
        text.x = parentBounds.width / 2;
        text.y = parentBounds.height / 2;
        text.textAlign = "center";
        text.textBaseline = "middle";
        return text;
    }

}
