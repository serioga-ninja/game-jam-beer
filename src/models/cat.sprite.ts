import * as PIXI from 'pixi.js';
import {IAppConfig} from '../config/app.config';
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

    constructor() {
        super();

        this.imagePath = 'sprites/cat.png';
    }

    load(loader: Loader): void {

    }

    setup(application: Application, appConfig: IAppConfig) {
        this._sprite = new PIXI.Sprite(PIXI.loader.resources[this.imagePath].texture);

        this._sprite.x = 96;
        this._sprite.y = 96;

        application.stage.addChild(this._sprite);
        application.ticker.add(this.gameLoop, this);
    }

    gameLoop() {
        this.sprite.x++;
    }
}
