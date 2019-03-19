export class SleepAsync {

    private static readonly MILLISECONDS = 1000;

    static async millis(value: number) {
        return new Promise<void>(resolve => {
            window.setTimeout(resolve, value);
        });
    }

    static async seconds(value: number) {
        await this.millis(value * SleepAsync.MILLISECONDS);
    }

    private constructor() {
    }

}
