import {Preloader} from "../../util/loader/Preloader";
import Container = createjs.Container;

export abstract class AbstractScene extends Container {

    abstract init(): void;

    async replaceScene(scene: AbstractScene) {
        const parent = this.parent;
        parent.removeChild(this);
        await AbstractScene.addScene(scene, parent);
    }

    private static async addScene(scene: AbstractScene, parent: Container) {
        await Preloader.preloadAsync();
        parent.addChild(scene);
        scene.init();
    }

}
