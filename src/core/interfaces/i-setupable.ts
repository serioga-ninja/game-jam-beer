import Application = PIXI.Application;
import ApplicationOptions = PIXI.ApplicationOptions;

export interface ISetupable {
    setup(application: Application, appConfig: ApplicationOptions): void;
}
