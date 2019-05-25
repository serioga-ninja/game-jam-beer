import Application = PIXI.Application;
import ApplicationOptions = PIXI.ApplicationOptions;

export class App {
    application: Application;

    constructor(options: ApplicationOptions = {}) {
        this.application = new Application({
            width: 256,
            height: 256,
            antialias: true,
            transparent: false,
            resolution: 1,
            ...options
        });
    }
}
