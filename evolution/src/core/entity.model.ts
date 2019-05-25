import Application = PIXI.Application;
import {ISetupable} from './interfaces';
import Graphics = PIXI.Graphics;

const uuidv4 = require('uuid/v4');

export interface IEntityModel extends ISetupable {
    readonly id: string;
    readonly entity: Graphics;
    onTick(): void;
}

export abstract class EntityModel implements IEntityModel {
    readonly id: string;
    abstract readonly entity: Graphics;

    constructor(protected application: Application) {
        this.id = uuidv4();
    }

    abstract setup(): void;

    onTick(): void {
    }
}
