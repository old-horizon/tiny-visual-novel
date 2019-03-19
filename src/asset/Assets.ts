export namespace Assets {

    export class Image {

        static readonly SCENARIO = {
            CHOICE: "assets/image/scenario/choice.png",
            PANEL: "assets/image/scenario/panel.png",
            EVENT: {
                SWEAT: {
                    SWF: "assets/image/scenario/event/sweat.swf",
                    PNG: "assets/image/scenario/event/sweat.png",
                },
            },
            WAIT: "assets/image/scenario/wait.png",
        };

        static readonly LOADER = {
            IMAGES: "assets/image/loader/images.png",
        };

        static readonly MAP = {
            BACKGROUND: "assets/image/map/background.jpg",
            HOVER: "assets/image/map/hover.png",
            ICONS: "assets/image/map/icons.png",
            SIDEBAR: "assets/image/map/sidebar.png",
        };

        private constructor() {
        }

    }

    export class Xml {

        static readonly EVENTS = "assets/xml/events.xml";

        private constructor() {
        }

    }

}
