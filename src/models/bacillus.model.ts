import config from '../config/app.config';
import {
    BACILLUS_COLOR,
    BACILLUS_OUT_COLOR,
    BACILLUS_OUT_LINE_WIDTH,
    BACILLUS_RADIUS,
    BACILLUS_SPEED,
    THE_HALF
} from '../config/defaults';
import {Color} from '../core/color';
import {EntityModel, IEntityModel} from '../core/entity.model';
import {IKeyboard, Keyboard} from '../core/keyboard';
import {MathHelper} from '../core/math-helper';
import Application = PIXI.Application;
import Graphics = PIXI.Graphics;
import Text = PIXI.Text;

export interface IBacillusOverrideOptions {
    startPositionX?: number;
    startPositionY?: number;
    radius?: number;
}

export interface IBacillusModel extends IEntityModel {
    readonly straight: number;
    readonly dead: boolean;
    readonly color: Color;

    consume<T extends IBacillusModel>(bacillus: T): void;
    destroy(): void;
}

export class BacillusModel extends EntityModel implements IBacillusModel {

    protected readonly bacillus: Graphics;
    protected readonly points: Text;
    protected keyboard: IKeyboard;

    protected application: PIXI.Application;

    protected outColor: Color;
    protected outLineWidth: number;
    protected radius: number;
    protected speed: number;
    protected startPositionX: number;
    protected startPositionY: number;

    protected _dead: boolean;

    public readonly color: Color;
    public readonly id: string;

    get straight(): number {
        return this.radius;
    }

    get entity(): Graphics {
        return this.bacillus;
    }

    get dead(): boolean {
        return this._dead;
    }

    constructor(application: Application, options: IBacillusOverrideOptions = <IBacillusOverrideOptions>{}) {
        super(application);

        this._dead = false;

        this.bacillus = new Graphics();
        this.keyboard = new Keyboard();

        this.outLineWidth = BACILLUS_OUT_LINE_WIDTH;
        this.radius = options.radius || BACILLUS_RADIUS + Math.random(); //
        this.speed = BACILLUS_SPEED;
        this.outColor = new Color(BACILLUS_OUT_COLOR);
        this.color = new Color([MathHelper.random(0, 255), MathHelper.random(0, 255), MathHelper.random(0, 255)]);

        // TODO: take this values from the config
        this.startPositionX = options.startPositionX || config.width / THE_HALF;
        this.startPositionY = options.startPositionY || config.height / THE_HALF;

        this.points = new Text(Math.ceil(this.radius).toString());
    }

    protected buildBacillus() {
        this.points.text = Math.ceil(this.radius).toString();
        this.points.x = this.radius * -1;
        this.points.y = (this.radius * 2) * -1;
        this.bacillus.addChild(this.points);

        this.bacillus.clear();
        this.bacillus.lineStyle(this.outLineWidth, this.outColor.hex, 1);
        this.bacillus.beginFill(this.color.hex, 1);
        this.bacillus.drawCircle(0, 0, this.radius);
        this.bacillus.endFill();
    }

    setup(): void {
        this.application.stage.addChild(this.bacillus);

        this.bacillus.x = this.startPositionX;
        this.bacillus.y = this.startPositionY;

        this.buildBacillus();

        this.application.ticker.add(this.onTick, this);
    }

    consume<T extends IBacillusModel>(bacillus: T) {
        const square: number = Math.PI * Math.pow(bacillus.straight, 2);
        const currentSquare: number = Math.PI * Math.pow(this.radius, 2);
        this.radius = Math.sqrt((square + currentSquare) / Math.PI);
        this.color.mix(bacillus.color.rgb);
        this.buildBacillus();
    }

    destroy() {
        this.bacillus.clear();
        this.bacillus.children.forEach((children) => {
            children.destroy();
        });
        this._dead = true;
        this.application.ticker.remove(this.onTick, this);
    }
}
