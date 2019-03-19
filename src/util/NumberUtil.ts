export class NumberUtil {

    static parseInt(str: string) {
        const int = parseInt(str, 10);
        if (isNaN(int)) {
            throw new Error(`${str} is not a number.`);
        }
        return int;
    }

    private constructor() {
    }

}
