import Application = PIXI.Application;
import {ISetupable} from './interfaces';
import ApplicationOptions = PIXI.ApplicationOptions;

export interface IEntityModel extends ISetupable {
}

export abstract class EntityModel implements IEntityModel {
    abstract setup(application: Application, appConfig: ApplicationOptions): void;
}
