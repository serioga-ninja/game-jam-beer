import config from '../config/app.config';
import {HitTestLogic} from '../core/hit-test.logic';
import {MathHelper} from '../core/math-helper';
import {ISceneBase, SceneBase} from '../core/scene.base';
import {ISpriteModel} from '../core/sprite-model';
import {IBacillusModel} from '../models/bacillus.model';
import {GrassModel, IGrassModel} from '../models/grass';
import {NpcBacillusModel} from '../models/npc-bacillus.model';
import {UserBacillusModel} from '../models/user-bacillus.model';
import Application = PIXI.Application;
import Graphics = PIXI.Graphics;
import Loader = PIXI.loaders.Loader;

const BACILLUS_COUNT: number = 40;
const GRASS_COUNT: number = 100;

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

        for (let i = 0; i < BACILLUS_COUNT; i++) {
            this.models.push(
                new NpcBacillusModel(application, {
                    startPositionY: MathHelper.random(0, config.fieldHeight),
                    startPositionX: MathHelper.random(0, config.fieldWidth),
                    radius: MathHelper.random(this.user.straight / 3, this.user.straight * 1.3)
                })
            );
        }

        this.grassModels = [];
        for (let i = 0; i < GRASS_COUNT; i++) {
            this.grassModels.push(
                new GrassModel(application)
            );
        }
    }


    setup() {
        const border: Graphics = new Graphics();

        border.lineStyle(2, 0xFEEB77, 1);
        border.beginFill(0x650A5A, 0);
        border.drawRect(0, 0, config.fieldWidth, config.fieldHeight);
        border.endFill();

        this.application.stage.addChild(border);

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

        if (this.user.dead || this.user.straight > 90) {
            this.application.stop()
        }

        this.models = this.models
            .filter((model: IBacillusModel) => idsToRemove.indexOf(model.id) === -1);

        // add new bacillus to the stage
        idsToRemove.forEach(() => {
            const newBacillus = new NpcBacillusModel(this.application, {
                startPositionY: MathHelper.random(0, config.fieldHeight),
                startPositionX: MathHelper.random(0, config.fieldWidth),
                radius: MathHelper.random(this.user.straight / 2, this.user.straight * 1.5)
            });
            newBacillus.setup();
            this.models.push(newBacillus);
        });
    }

    load(loader: Loader): void {
        loader
            .add(this.spriteModels.map((model: ISpriteModel) => model.imagePath))
            .on('progress', this.loadProgressHandler, this);
    }
}

