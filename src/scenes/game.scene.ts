import {IAppConfig} from '../config/app.config';
import {IEntityModel} from '../core/entity.model';
import {ISceneBase, SceneBase} from '../core/scene.base';
import {ISpriteModel} from '../core/sprite-model';
import {ThingModel} from '../models/thing.model';
import Application = PIXI.Application;
import Loader = PIXI.loaders.Loader;

export class GameScene extends SceneBase implements ISceneBase {

    private readonly spriteModels: ISpriteModel[];
    private readonly models: IEntityModel[];

    constructor() {
        super();

        this.spriteModels = [
            // new CatSprite()
        ];

        this.models = [
            new ThingModel()
        ];
    }


    setup(application: Application, appConfig: IAppConfig) {
        for (const model of this.spriteModels) {
            model.setup(application, appConfig);
        }

        for (const model of this.models) {
            model.setup(application, appConfig);
        }
    }

    load(loader: Loader): void {
        loader
            .add(this.spriteModels.map((model: ISpriteModel) => model.imagePath))
            .on('progress', this.loadProgressHandler, this);
    }
}

