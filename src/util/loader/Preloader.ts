import {ILoadingScreen} from "./ILoadingScreen";
import {IPreloadable} from "./IPreloadable";
import {PreloadableContext} from "./PreloadableContext";
import Event = createjs.Event;
import LoadQueue = createjs.LoadQueue;

export class Preloader {

    private static readonly items: IPreloadable[] = [];

    private static loadingScreen: ILoadingScreen = {
        load() {
        },
        onload() {
        },
        init() {
        },
        progress() {
        },
        dispose() {
        },
    };

    static register(item: IPreloadable) {
        this.items.push(item);
    }

    static async setLoadingScreenAsync(loadingScreen: ILoadingScreen) {
        const delegate = new PreloaderDelegate(Preloader.loadingScreen, [loadingScreen]);
        await delegate.loadAsync();
        Preloader.loadingScreen = loadingScreen;
    }

    static async preloadAsync() {
        const loadingScreen = Preloader.loadingScreen;
        loadingScreen.init();

        while (Preloader.items.length > 0) {
            const delegate = new PreloaderDelegate(loadingScreen, Preloader.items.concat());
            Preloader.items.length = 0;
            await delegate.loadAsync();
        }

        loadingScreen.dispose();
    }
}

class PreloaderDelegate {

    private static readonly MAX_CONNECTIONS = 6;
    private static readonly RETRY_LIMIT = 3;

    private readonly queue = new LoadQueue();
    private readonly context = new PreloadableContext();
    private readonly loadingScreen: ILoadingScreen;
    private readonly items: IPreloadable[];

    private completed = false;
    private retryCount = 0;

    constructor(loadingScreen: ILoadingScreen, items: IPreloadable[]) {
        this.loadingScreen = loadingScreen;
        this.items = items;
        this.queue.setMaxConnections(PreloaderDelegate.MAX_CONNECTIONS);
    }

    async loadAsync() {
        this.registerAssets();
        const requestPaths = this.context.requestPaths;

        if (requestPaths.length > 0) {
            while (!this.completed) {
                try {
                    await this.requestAsync(requestPaths);
                } catch (e) {
                    if (this.retryCount === PreloaderDelegate.RETRY_LIMIT) {
                        throw new Error(e);
                    }
                    window.alert(`${e}\n\nClick OK to retry.`);
                    this.retryCount++;
                }
            }
        }

        this.retryCount = 0;
        this.loadCompleted(requestPaths);
    }

    private async requestAsync(requestPaths: string[]) {
        return new Promise<void>((resolve, reject) => {
            const onProgress = (e: any) => this.loadingScreen.progress((<Event>e).progress);

            const onComplete = () => {
                this.queue.removeEventListener("progress", onProgress);
                this.completed = true;
                resolve();
            };

            const onError = (e: any) => {
                this.queue.removeEventListener("progress", onProgress);
                this.queue.removeEventListener("complete", onComplete);
                const src = (<Event>e).data.src;
                reject(`Error occurred during downloading the assets: ${src}`);
            };

            this.queue.addEventListener("progress", onProgress);
            this.queue.addEventListener("complete", onComplete);
            this.queue.addEventListener("error", onError);

            this.queue.loadManifest(PreloaderDelegate.toManifest(requestPaths));
        });
    }

    private loadCompleted(requestPaths: string[]) {
        const loadedData = this.collectLoadedData(requestPaths);
        this.context.setData(loadedData);
        this.notifyAssetLoaded();
    }

    private collectLoadedData(requestPaths: string[]) {
        const loadedData = new Map<string, any>();
        for (const path of requestPaths) {
            loadedData.set(path, this.queue.getResult(path));
        }
        return loadedData;
    }

    private registerAssets() {
        for (const item of this.items) {
            item.load(this.context);
        }
    }

    private notifyAssetLoaded() {
        for (const item of this.items) {
            item.onload();
        }
    }

    private static toManifest(requestPaths: string[]) {
        return requestPaths.map(path => <Manifest>{src: path});
    }

}

interface Manifest {

    [src: string]: string;

}
