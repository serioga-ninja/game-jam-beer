import * as PIXI from 'pixi.js';
import {ISpriteModel, SpriteModel} from '../core/sprite-model';
import Application = PIXI.Application;
import Loader = PIXI.loaders.Loader;
import Sprite = PIXI.Sprite;

export class CatSprite extends SpriteModel implements ISpriteModel {

    private _sprite: Sprite;

    public readonly imagePath: string;

    get sprite(): Sprite {
        return this._sprite;
    }

    constructor(application: Application) {
        super(application);

        this.imagePath = 'sprites/cat.png';
    }

    load(loader: Loader): void {

    }

    setup() {
        this._sprite = new PIXI.Sprite(PIXI.loader.resources[this.imagePath].texture);

        this._sprite.x = 96;
        this._sprite.y = 96;

        this.application.stage.addChild(this._sprite);
        this.application.ticker.add(this.onTick, this);
    }

    onTick() {
        this.sprite.x++;
    }
}
