import {IEffect} from "../../../model/scenario/IEffect";
import {BackgroundAnimationFactory} from "./animation/background/BackgroundAnimationFactory";
import {CharacterAnimationFactory} from "./animation/character/CharacterAnimationFactory";
import Bitmap = createjs.Bitmap;
import Container = createjs.Container;
import DisplayObject = createjs.DisplayObject;
import Tween = createjs.Tween;

export class Display extends Container {

    private static INDEX = {
        BACKGROUND: 0,
        LAYER: 1,
    };

    private readonly layers: Display.Layer[] = [];

    private backgroundImage: DisplayObject;

    get background() {
        return this.backgroundImage;
    }

    set background(image: DisplayObject) {
        if (this.backgroundImage !== undefined) {
            this.removeChild(this.backgroundImage);
        }
        this.addChildAt(image, Display.INDEX.BACKGROUND);
        this.backgroundImage = image;
    }

    getLayer(index: number) {
        this.setupLayers(index);
        return this.layers[index];
    }

    async animateCharacterAsync(image: Bitmap, name: string, target: number) {
        const animation = CharacterAnimationFactory.newInstance(name);
        image && Display.locateBitmap(image, target);
        await animation.executeAsync(this, target, image);
    }

    async animateBackgroundAsync(name: string) {
        const animation = BackgroundAnimationFactory.newInstance(name);
        await animation.executeAsync(this);
    }

    async allFadeOutAsync() {
        const fadeOutPromises = this.layers.map(layer => layer.fadeOutAsync());
        await Promise.all(fadeOutPromises);
    }

    private setupLayers(index: number) {
        const requiredLength = index + 1;
        if (this.layers.length >= requiredLength) {
            return;
        }
        for (let i = 0, length = requiredLength - this.layers.length; i < length; i++) {
            const layer = new Display.Layer();
            this.layers.push(layer);
            this.addChildAt(layer, Display.INDEX.LAYER);
        }
    }

    private static locateBitmap(bitmap: Bitmap, target: number) {
        const width = bitmap.image.width;
        const height = bitmap.image.height;

        const halfWidth = width / 2;
        const halfScreenMargin = (800 - width) / 2;

        bitmap.regX = halfWidth;
        const x = halfWidth * target;
        const offsetX = (-halfWidth + 266) * (target - 1);
        bitmap.x = halfScreenMargin + x + offsetX;
        bitmap.y = (620 - height) - 148;
    }

}

export namespace Display {

    export class Layer extends Container {

        private effectImage: DisplayObject;

        addImage(asset: DisplayObject) {
            this.addChild(asset);
        }

        setImage(asset: DisplayObject) {
            this.clear();
            this.addChild(asset);
        }

        clear() {
            this.removeAllChildren();
        }

        fadeOutAsync() {
            return new Promise<void>(resolve => {
                Tween.get(this)
                    .to({alpha: 0}, 100)
                    .call(() => this.clear())
                    .to({alpha: 1}, 100)
                    .call(() => resolve());
            });
        }

        async addEffectAsync(image: DisplayObject, effect: IEffect<DisplayObject>) {
            this.adjustEffectLocation(image);
            effect.init(image);

            this.setEffect(image);
            await effect.animateAsync(image);
        }

        private adjustEffectLocation(image: DisplayObject) {
            const parent = this.getChildAt(0);
            if (parent === null || parent === undefined) {
                return;
            }
            image.x += parent.x;
        }

        private setEffect(image: DisplayObject) {
            if (this.effectImage !== undefined) {
                this.removeChild(this.effectImage);
            }
            this.addChild(image);
            this.effectImage = image;
        }

    }

}
