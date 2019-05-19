import config from '../config/app.config';
import {BACILLUS_RADIUS} from '../config/defaults';
import {IEntityModel} from '../core/entity.model';
import {HitTestLogic} from '../core/hit-test.logic';
import {MathHelper} from '../core/math-helper';
import {ISceneBase, SceneBase} from '../core/scene.base';
import {ISpriteModel} from '../core/sprite-model';
import {IBacillusModel} from '../models/bacillus.model';
import {GrassModel, IGrassModel} from '../models/grass';
import {NpcBacillusModel} from '../models/npc-bacillus.model';
import {UserBacillusModel} from '../models/user-bacillus.model';
import Application = PIXI.Application;
import Loader = PIXI.loaders.Loader;
import Graphics = PIXI.Graphics;

export class GameScene extends SceneBase implements ISceneBase {

    private readonly spriteModels: ISpriteModel[];
    private models: IBacillusModel[];
    private readonly grassModels: IGrassModel[];
    private readonly user: UserBacillusModel;
    private readonly hitTest: HitTestLogic;

    constructor(application: Application) {
        super(application);
        this.hitTest = new HitTestLogic();
        this.user = new UserBacillusModel(application);

        this.spriteModels = [];

        this.models = [
            this.user
        ];

        for (let i = 0; i < 40; i++) {
            this.models.push(
                new NpcBacillusModel(application, {
                    startPositionY: MathHelper.random(0, config.fieldHeight),
                    startPositionX: MathHelper.random(0, config.fieldWidth),
                    radius: MathHelper.random(BACILLUS_RADIUS - 5, BACILLUS_RADIUS + 5)
                })
            )
        }

        this.grassModels = [];
        for (let i = 0; i < 100; i++) {
            this.grassModels.push(
                new GrassModel(application)
            );
        }
    }


    setup() {
        // setup grass
        for (const model of this.grassModels) {
            model.setup();
        }

        for (const model of this.spriteModels) {
            model.setup();
        }

        for (const model of this.models) {
            model.setup();
        }

        this.application.ticker.add(this.onTick, this);
    }

    onTick() {
        const idsToRemove: string[] = [];

        [...this.models].forEach((model: IBacillusModel) => {
            this.models.forEach((secondModel: IBacillusModel) => {
                if (model.id === secondModel.id) return;

                if (this.hitTest.hitTestCircle(model.entity, secondModel.entity)) {
                    if (model.straight > secondModel.straight) {
                        model.consume(secondModel);
                        secondModel.destroy();

                        idsToRemove.push(secondModel.id);
                    }
                }
            });
        });

        this.models = this.models
            .filter((model: IBacillusModel) => idsToRemove.indexOf(model.id) === -1);
    }

    load(loader: Loader): void {
        loader
            .add(this.spriteModels.map((model: ISpriteModel) => model.imagePath))
            .on('progress', this.loadProgressHandler, this);
    }
}

