import ApplicationOptions = PIXI.ApplicationOptions;

export interface IAppConfig extends ApplicationOptions {
    width: number;
    height: number;
    backgroundColor: number;
    fieldWidth:number;
    fieldHeight:number;
}

export class AppConfig implements IAppConfig {
    public readonly width: number = 800;
    public readonly height: number = 800;
    public readonly backgroundColor: number = 0x1099bb;
    public readonly fieldWidth: number = 3000;
    public readonly fieldHeight: number = 3000;
}

const config = new AppConfig();

export default config;
