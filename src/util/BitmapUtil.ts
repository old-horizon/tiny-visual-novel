import Bitmap = createjs.Bitmap;
import Rectangle = createjs.Rectangle;

export class BitmapUtil {

    static clip(bitmap: Bitmap, area: BitmapUtil.ClipArea) {
        const rect = new Rectangle(area.x, area.y, area.w, area.h);
        const clipped = bitmap.clone();
        clipped.sourceRect = rect;
        return clipped;
    }

    private constructor() {
    }

}

export namespace BitmapUtil {

    export interface ClipArea {

        x: number;

        y: number;

        w: number;

        h: number;

    }

}
