import {
    BACILLUS_COLOR,
    BACILLUS_OUT_COLOR,
    BACILLUS_OUT_LINE_WIDTH,
    BACILLUS_RADIUS,
    BACILLUS_SPEED,
    THE_HALF
} from '../config/defaults';
import {EntityModel, IEntityModel} from '../core/entity.model';
import {IKeyboard, Keyboard} from '../core/keyboard';
import Application = PIXI.Application;
import Graphics = PIXI.Graphics;

export class BacillusModel extends EntityModel implements IEntityModel {

    protected readonly bacillus: Graphics;
    protected keyboard: IKeyboard;

    protected application: PIXI.Application;

    protected outColor: number;
    protected outLineWidth: number;
    protected radius: number;
    protected speed: number;
    protected color: number;
    protected startPositionX: number;
    protected startPositionY: number;

    constructor(application: Application) {
        super(application);

        this.bacillus = new Graphics();
        this.keyboard = new Keyboard();

        this.outColor = BACILLUS_OUT_COLOR;
        this.color = BACILLUS_COLOR;
        this.outLineWidth = BACILLUS_OUT_LINE_WIDTH;
        this.radius = BACILLUS_RADIUS;
        this.speed = BACILLUS_SPEED;

        // TODO: take this values from the config
        this.startPositionX = 800 / THE_HALF;
        this.startPositionY = 800 / THE_HALF;
    }

    setup(): void {
        this.application.stage.addChild(this.bacillus);

        this.bacillus.lineStyle(this.outLineWidth, this.outColor, 1);
        this.bacillus.beginFill(this.color, 1);
        this.bacillus.drawCircle(this.startPositionX, this.startPositionY, this.radius);
        this.bacillus.endFill();

        this.application.ticker.add(this.onTick, this);
    }

    onTick() {
    }
}
