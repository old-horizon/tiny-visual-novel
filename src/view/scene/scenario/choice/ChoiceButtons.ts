import {IChoice} from "../../../../model/scenario/IChoice";
import {ChoiceButton} from "./ChoiceButton";
import Container = createjs.Container;

export class ChoiceButtons extends Container {

    private readonly buttons: ChoiceButton[] = [
        ChoiceButton.red({x: 190, y: 178, index: 1}),
        ChoiceButton.blue({x: 190, y: 268, index: 2}),
    ];

    async choiceAsync(...choices: IChoice[]) {
        if (choices.length !== this.buttons.length) {
            throw new Error(`Wrong number of choices: expected:<${this.buttons.length}> actual:<${choices.length}>`);
        }
        const target = await Promise.race(this.createChoicePromises(choices));
        this.disposeButtons();
        return target;
    }

    private createChoicePromises(choices: IChoice[]) {
        return this.buttons.map((button, index) => button.showOptionAsync(choices[index], this));
    }

    private disposeButtons() {
        for (const button of this.buttons) {
            button.dispose();
        }
    }

}
