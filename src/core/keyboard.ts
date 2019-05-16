export interface IKeyboard {
    keyPressed(key: string): boolean;
}


export class Keyboard implements IKeyboard {

    protected pressedKeys: string[];

    constructor() {
        this.pressedKeys = [];

        window.addEventListener(
            'keydown', this.downHandler.bind(this), false
        );
        window.addEventListener(
            'keyup', this.upHandler.bind(this), false
        );
    }

    protected downHandler(event: KeyboardEvent) {
        this.pressedKeys.push(event.key);
    }

    protected upHandler(event: KeyboardEvent) {
        this.pressedKeys = this.pressedKeys.filter((key: string) => key !== event.key);
    }

    keyPressed(key: string): boolean {
        return this.pressedKeys.indexOf(key) !== -1;
    }
}
