import {PreloadableAsset} from "./PreloadableAsset";

export class PreloadableContext {

    private static readonly cache = new Map<string, any>();

    private readonly assets = new Map<string, PreloadableAsset<any>[]>();

    getImage(path: string, callback: PreloadableAsset.OnloadCallback<HTMLImageElement>) {
        this.register(PreloadableAsset.image(path, callback));
    }

    getXml(path: string, callback: PreloadableAsset.OnloadCallback<XMLDocument>) {
        this.register(PreloadableAsset.xml(path, callback));
    }

    private register(asset: PreloadableAsset<any>) {
        const path = asset.path;

        const data = PreloadableContext.cache.get(path);
        if (data !== undefined) {
            asset.setData(data);
            return;
        }

        const assets = this.assets.get(path) || [];
        assets.push(asset);
        this.assets.set(path, assets);
    }

    get requestPaths() {
        return Array.from(this.assets.keys());
    }

    setData(data: Map<string, any>) {
        for (const path of this.requestPaths) {
            const targetAssets = this.assets.get(path);
            const targetData = data.get(path);

            for (const asset of targetAssets) {
                asset.setData(targetData);
            }

            PreloadableContext.cache.set(path, targetData);
        }
    }
}
