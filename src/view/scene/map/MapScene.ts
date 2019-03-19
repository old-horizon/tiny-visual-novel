import {Assets} from "../../../asset/Assets";
import {Event} from "../../../model/map/Event";
import {MapIconKeys} from "../../../model/map/MapIconKeys";
import {Serials} from "../../../model/Serials";
import {BitmapUtil} from "../../../util/BitmapUtil";
import {IPreloadable} from "../../../util/loader/IPreloadable";
import {Preload} from "../../../util/loader/Preload";
import {PreloadableContext} from "../../../util/loader/PreloadableContext";
import {AbstractScene} from "../../common/AbstractScene";
import {ToggleButtonGroup} from "../../common/ToggleButtonGroup";
import {ScenarioScene} from "../scenario/ScenarioScene";
import {MapIcon} from "./MapIcon";
import Bitmap = createjs.Bitmap;

@Preload
export class MapScene extends AbstractScene implements IPreloadable {

    private static readonly ICON_DEFINITIONS: IconDefinition[] = [
        {
            id: MapIconKeys.PARK,
            x: 216,
            y: 249,
            image: {x: 562, y: 161, w: 148, h: 161},
            hoverImage: {x: 710, y: 161, w: 148, h: 161},
            clickImage: {x: 190, y: 322, w: 148, h: 161},
        },
        {
            id: MapIconKeys.SCHOOL,
            x: 336,
            y: 21,
            image: {x: 0, y: 0, w: 148, h: 159},
            hoverImage: {x: 296, y: 0, w: 148, h: 159},
            clickImage: {x: 148, y: 0, w: 148, h: 159},
        },
        {
            id: MapIconKeys.SECRET_BASE,
            x: 387,
            y: 424,
            image: {x: 0, y: 322, w: 190, h: 161},
            hoverImage: {x: 372, y: 161, w: 190, h: 161},
            clickImage: {x: 630, y: 0, w: 190, h: 161},
        },
        {
            id: MapIconKeys.SHOP,
            x: 428,
            y: 208,
            image: {x: 654, y: 322, w: 158, h: 168},
            hoverImage: {x: 338, y: 322, w: 158, h: 168},
            clickImage: {x: 496, y: 322, w: 158, h: 168},
        },
        {
            id: MapIconKeys.SHOPPING,
            x: 24,
            y: 415,
            image: {x: 0, y: 161, w: 186, h: 161},
            hoverImage: {x: 444, y: 0, w: 186, h: 161},
            clickImage: {x: 186, y: 161, w: 186, h: 161},
        },
    ];

    private static readonly PATH = {
        EVENTS: Assets.Xml.EVENTS,
        BACKGROUND: Assets.Image.MAP.BACKGROUND,
        SIDEBAR: Assets.Image.MAP.SIDEBAR,
        ICONS: Assets.Image.MAP.ICONS,
    };

    private readonly serials: Serials;
    private readonly icons = new Map<string, MapIcon>();

    private events: Event[];
    private background: Bitmap;
    private sidebar: Bitmap;
    private iconImages: Bitmap;

    constructor(serials: Serials) {
        super();
        this.serials = serials;
    }

    load(context: PreloadableContext) {
        context.getXml(MapScene.PATH.EVENTS, data => this.events = Event.parse(data));
        context.getImage(MapScene.PATH.BACKGROUND, data => this.background = new Bitmap(data));
        context.getImage(MapScene.PATH.SIDEBAR, data => this.sidebar = new Bitmap(data));
        context.getImage(MapScene.PATH.ICONS, data => this.iconImages = new Bitmap(data));
    }

    onload() {
        const toggleGroup = new ToggleButtonGroup();
        for (const definition of MapScene.ICON_DEFINITIONS) {
            const icon = new MapIcon({
                x: definition.x,
                y: definition.y,
                image: BitmapUtil.clip(this.iconImages, definition.image),
                hoverImage: BitmapUtil.clip(this.iconImages, definition.hoverImage),
                clickImage: BitmapUtil.clip(this.iconImages, definition.clickImage),
            });

            icon.toggleGroup = toggleGroup;
            this.icons.set(definition.id, icon);
        }

        this.locateSidebar();
    }

    init() {
        this.registerEvents();

        this.addChild(this.background);
        this.addChild(this.sidebar);

        for (const icon of this.icons.values()) {
            icon.init();
            this.addChild(icon);
        }
    }

    private registerEvents() {
        for (const event of this.events) {
            if (event.getStatus(this.serials) !== Event.Status.OPEN) {
                continue;
            }
            const targetIcon = this.icons.get(event.id);
            if (targetIcon === undefined) {
                return;
            }
            targetIcon.activate(async () => await this.playScenarioAsync(event.xmlFile));
        }
    }

    private locateSidebar() {
        const backgroundWidth = this.background.image.width;
        const sidebarWidth = this.sidebar.image.width;
        this.sidebar.x = backgroundWidth - sidebarWidth;
    }

    private async playScenarioAsync(xmlFile: string) {
        const eventScene = new ScenarioScene(this.serials, xmlFile);
        await this.replaceScene(eventScene);
    }

}

interface IconDefinition {

    id: string;

    x: number;

    y: number;

    image: BitmapUtil.ClipArea;

    hoverImage: BitmapUtil.ClipArea;

    clickImage: BitmapUtil.ClipArea;

}
