import {AppConfig} from '../config/app.config';
import {EntityModel, IEntityModel} from '../core/entity.model';
import {MathHelper} from '../core/math-helper';
import Graphics = PIXI.Graphics;
import Application = PIXI.Application;

const config = new AppConfig();

export interface IGrassModel extends IEntityModel {

}

export class GrassModel extends EntityModel implements IGrassModel {
    protected readonly grassGraphics: Graphics;

    protected startPositionX: number;
    protected startPositionY: number;

    get entity() {
        return this.grassGraphics;
    }

    constructor(application: Application) {
        super(application);

        this.grassGraphics = new Graphics();
        this.startPositionX = MathHelper.random(0, config.fieldWidth);
        this.startPositionY = MathHelper.random(0, config.fieldHeight);
    }

    setup(): void {
        this.application.stage.addChild(this.grassGraphics);


        this.grassGraphics.x = this.startPositionX;
        this.grassGraphics.y = this.startPositionY;

        this.grassGraphics.lineStyle(Math.random() * 10, Math.random() * 0xFFFFFF, 1);
        this.grassGraphics.moveTo(Math.random() * 30, Math.random() * 20);
        this.grassGraphics.bezierCurveTo(
            Math.random() * 30, Math.random() * 20,
            Math.random() * 30, Math.random() * 20,
            Math.random() * 30, Math.random() * 20,
        );
    }
}
