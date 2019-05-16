import {IAppConfig} from '../config/app.config';
import {EntityModel, IEntityModel} from '../core/entity.model';
import {IKeyboard, Keyboard} from '../core/keyboard';
import Graphics = PIXI.Graphics;

export class ThingModel extends EntityModel implements IEntityModel {

    private readonly thing: Graphics;
    private count: number;
    private keyboard: IKeyboard;

    private application: PIXI.Application;

    protected radius: number;
    protected speed: number;

    constructor() {
        super();

        this.count = 0;
        this.thing = new Graphics();
        this.keyboard = new Keyboard();

        this.speed = 3;
    }

    setup(application: PIXI.Application, appConfig: IAppConfig): void {
        this.application = application;

        application.stage.addChild(this.thing);

        this.thing.lineStyle(2, 0xFEEB77, 1);
        this.thing.beginFill(0x650A5A, 1);
        this.thing.drawCircle(appConfig.width, appConfig.height, 50);
        this.thing.endFill();

        const gr = new Graphics();

        gr.beginFill(0x650A5A, 1);
        gr.drawCircle(100, 100, 5);
        gr.endFill();
        application.stage.addChild(gr);


        application.ticker.add(this.onTick, this);
    }

    onTick() {
        if (this.keyboard.keyPressed('ArrowUp')) {
            this.application.stage.y += this.speed;
            this.thing.y -= this.speed;
        }
    }
}
