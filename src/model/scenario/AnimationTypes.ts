export namespace AnimationTypes {

    export class Character {

        static readonly ALL_FADE_OUT = "オールフェードアウト";
        static readonly FADE_OUT = "フェードアウト";
        static readonly APPEAR_BOTTOM = "登場_下";
        static readonly APPEAR_RIGHT = "登場_右";
        static readonly APPEAR_LEFT = "登場_左";
        static readonly EXIT_LEFT = "退場_左";
        static readonly TRANSITION = "切り替え";
        static readonly JUMP = "飛び上がる";
        static readonly NOD = "頷き";
        static readonly DEPRESS = "落ち込み";
        static readonly SHOCK = "衝撃";

        private constructor() {
        }

    }

    export class Background {

        static readonly SHOCK = "衝撃";

        private constructor() {
        }

    }

}
