import {IEntityModel} from '../core/entity.model';
import {ISceneBase, SceneBase} from '../core/scene.base';
import {ISpriteModel} from '../core/sprite-model';
import {UserBacillusModel} from '../models/user-bacillus.model';
import Application = PIXI.Application;
import Loader = PIXI.loaders.Loader;

export class GameScene extends SceneBase implements ISceneBase {

    private readonly spriteModels: ISpriteModel[];
    private readonly models: IEntityModel[];
    private readonly user: UserBacillusModel;

    constructor(application: Application) {
        super(application);
        this.user = new UserBacillusModel(application);

        this.spriteModels = [];

        this.models = [
            this.user
        ];
    }


    setup() {
        for (const model of this.spriteModels) {
            model.setup();
        }

        for (const model of this.models) {
            model.setup();
        }
    }

    load(loader: Loader): void {
        loader
            .add(this.spriteModels.map((model: ISpriteModel) => model.imagePath))
            .on('progress', this.loadProgressHandler, this);
    }
}

