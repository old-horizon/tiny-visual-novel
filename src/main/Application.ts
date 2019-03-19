import "core-js";
import {Serials} from "../model/Serials";
import {RootScene} from "../view/common/RootScene";
import {MapScene} from "../view/scene/map/MapScene";

export class Application {

    private static readonly CANVAS_ID = "screen";

    static main() {
        const root = new RootScene(Application.CANVAS_ID, 30);
        const serials = new Serials();
        const mapScene = new MapScene(serials);
        (async () => root.replaceScene(mapScene))();
    }

    private constructor() {
    }

}

document.addEventListener("DOMContentLoaded", () => Application.main());
