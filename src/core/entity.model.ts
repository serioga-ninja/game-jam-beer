import Application = PIXI.Application;
import {ISetupable} from './interfaces';

export interface IEntityModel extends ISetupable {
    onTick(): void;
}

export abstract class EntityModel implements IEntityModel {
    constructor(protected application: Application) {
    }

    abstract setup(): void;

    abstract onTick(): void;
}
