import {AbstractButton} from "./AbstractButton";

export class ToggleButtonGroup {

    private readonly buttons: AbstractButton[] = [];

    add(button: AbstractButton) {
        this.buttons.push(button);
    }

    toggle(selectedButton: AbstractButton) {
        for (const button of this.buttons.filter(button => button !== selectedButton)) {
            button.mouseOut();
        }
    }

}
