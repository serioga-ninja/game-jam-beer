import ApplicationOptions = PIXI.ApplicationOptions;

export interface IAppConfig extends ApplicationOptions {
    width: number;
    height: number;
    backgroundColor: number;
}

export class AppConfig implements IAppConfig {
    public readonly width: number = 800;
    public readonly height: number = 800;
    public readonly backgroundColor: number = 0x1099bb;
}
