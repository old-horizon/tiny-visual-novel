export class PreloadableAsset<T> {

    public readonly path: string;

    private readonly callback: Function;

    static image(path: string, callback: PreloadableAsset.OnloadCallback<HTMLImageElement>) {
        return new PreloadableAsset<HTMLImageElement>(path, callback);
    }

    static xml(path: string, callback: PreloadableAsset.OnloadCallback<XMLDocument>) {
        return new PreloadableAsset<XMLDocument>(path, callback);
    }

    private constructor(path: string, callback: PreloadableAsset.OnloadCallback<T>) {
        this.path = path;
        this.callback = callback;
    }

    setData(data: any) {
        this.callback(<T>data);
    }

}

export namespace PreloadableAsset {

    export interface OnloadCallback<T> {
        (data: T): void;
    }

}
