import {ILoadingScreen} from "../../util/loader/ILoadingScreen";
import {Preloader} from "../../util/loader/Preloader";
import {AbstractScene} from "./AbstractScene";
import {LoadingScreen} from "./LoadingScreen";
import Shape = createjs.Shape;
import Stage = createjs.Stage;
import Ticker = createjs.Ticker;
import Touch = createjs.Touch;

export class RootScene {

    private static readonly BACKGROUND_COLOR = "rgb(255, 204, 255)";

    private readonly canvas: WebkitHTMLCanvasElement;
    private readonly stage: Stage;
    private readonly originalWidth: number;
    private readonly originalHeight: number;
    private readonly loadingScreen: ILoadingScreen;

    constructor(canvasId: string, fps: number) {
        this.canvas = <WebkitHTMLCanvasElement>document.getElementById(canvasId);
        this.stage = RootScene.createStage(this.canvas, fps);
        this.originalWidth = this.canvas.width;
        this.originalHeight = this.canvas.height;
        this.loadingScreen = new LoadingScreen(this.stage);

        this.fillBackground();
        this.resizeCanvas();
        this.setupCanvasListeners();
    }

    async replaceScene(scene: AbstractScene) {
        await Preloader.setLoadingScreenAsync(this.loadingScreen);
        await Preloader.preloadAsync();
        this.stage.addChild(scene);
        scene.init();
    }

    private static createStage(canvas: HTMLCanvasElement, fps: number) {
        const stage = new Stage(canvas);
        stage.enableMouseOver(10);
        Touch.enable(stage);
        Ticker.framerate = fps;
        Ticker.timingMode = Ticker.RAF_SYNCHED;
        Ticker.addEventListener("tick", stage);
        return stage;
    }

    private fillBackground() {
        const rect = new Shape();
        rect.graphics.beginFill(RootScene.BACKGROUND_COLOR)
            .drawRect(0, 0, this.originalWidth, this.originalHeight);
        this.stage.addChild(rect);
    }

    private resizeCanvas() {
        const innerWidth = window.innerWidth;
        const innerHeight = window.innerHeight;

        const scale = Math.min(innerWidth / this.originalWidth, innerHeight / this.originalHeight);
        const width = this.originalWidth * scale;
        const height = this.originalHeight * scale;

        this.canvas.style.width = `${width}px`;
        this.canvas.style.height = `${height}px`;
    }

    private setupCanvasListeners() {
        window.addEventListener("resize", () => this.resizeCanvas());
        window.addEventListener("click", () => this.requestFullScreen());
    }

    private requestFullScreen() {
        const userAgent = window.navigator.userAgent;

        if (!userAgent.includes("Android")) {
            return;
        }

        if (!(<WebkitDocument>document).webkitFullscreenElement) {
            this.canvas.webkitRequestFullscreen();
        }
    }

}

interface WebkitDocument extends Document {

    webkitFullscreenElement(): Element | null;

}

interface WebkitHTMLCanvasElement extends HTMLCanvasElement {

    webkitRequestFullscreen(): void;

}
