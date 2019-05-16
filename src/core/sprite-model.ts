import {EntityModel, IEntityModel} from './entity.model';
import Loader = PIXI.loaders.Loader;

export interface ISpriteModel extends IEntityModel {
    readonly imagePath: string;
    load(loader: Loader): void;
}

export abstract class SpriteModel extends EntityModel implements ISpriteModel {
    abstract readonly imagePath: string;

    abstract load(loader: Loader): void;
}
