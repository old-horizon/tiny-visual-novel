import Text = createjs.Text;

export class StyledText {

    static newInstance(size: number, color?: string) {
        const text = new Text();
        text.font = StyledText.getFont(size);
        color && (text.color = color);
        return text;
    }

    private static getFont(size: number) {
        return `bold ${size}px sans-serif`;
    }

    private constructor() {
    }

}
