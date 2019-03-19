import DisplayObject = createjs.DisplayObject;

export interface IBackgroundAnimation {

    executeAsync(background: DisplayObject): Promise<void>;

}
