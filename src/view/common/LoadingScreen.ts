import {Assets} from "../../asset/Assets";
import {BitmapUtil} from "../../util/BitmapUtil";
import {ILoadingScreen} from "../../util/loader/ILoadingScreen";
import {PreloadableContext} from "../../util/loader/PreloadableContext";
import Bitmap = createjs.Bitmap;
import Container = createjs.Container;
import Stage = createjs.Stage;

export class LoadingScreen implements ILoadingScreen {

    private static readonly IMAGE = {
        PATH: Assets.Image.LOADER.IMAGES,
        AREA: {
            START: {x: 800, y: 0, w: 800, h: 600},
            END: {x: 0, y: 0, w: 800, h: 600},
        },
    };

    private static readonly TOP = 131;
    private static readonly BOTTOM = 547;
    private static readonly MAX_RANGE = LoadingScreen.BOTTOM - LoadingScreen.TOP;

    private readonly stage: Stage;
    private readonly screen = new Container();

    private startImage: Bitmap;
    private endImage: Bitmap;

    constructor(stage: Stage) {
        this.stage = stage;
    }

    load(context: PreloadableContext) {
        context.getImage(LoadingScreen.IMAGE.PATH, data => {
            const images = new Bitmap(data);
            this.startImage = BitmapUtil.clip(images, LoadingScreen.IMAGE.AREA.START);
            this.endImage = BitmapUtil.clip(images, LoadingScreen.IMAGE.AREA.END);
        });
    }

    onload() {
    }

    init() {
        this.screen.addChild(this.endImage);
        this.screen.addChild(this.startImage);
        this.stage.addChild(this.screen);
    }

    progress(ratio: number) {
        const range = LoadingScreen.MAX_RANGE * (1 - ratio);
        this.startImage.sourceRect.height = LoadingScreen.TOP + range;
    }

    dispose() {
        this.stage.removeChild(this.screen);
    }

}
