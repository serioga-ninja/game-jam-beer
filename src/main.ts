import * as PIXI from 'pixi.js';

import {App} from './app/app';
import {AppConfig, IAppConfig} from './config/app.config';
import {ISceneBase} from './core/scene.base';
import {GameScene} from './scenes/game.scene';


class Game {

    private readonly app: App;
    private readonly gameScene: ISceneBase;
    private readonly appConfig: IAppConfig;

    constructor() {
        this.appConfig = new AppConfig();
        this.app = new App(this.appConfig);

        this.gameScene = new GameScene();
    }


    run() {
        //  Add the canvas that Pixi automatically created for you to the HTML document
        document.body.appendChild(this.app.application.view);

        this.gameScene.load(PIXI.loader);

        PIXI.loader.load(() => {
            this.gameScene.setup(this.app.application, this.appConfig);
        });
    }
}

const game = new Game();

game.run();
