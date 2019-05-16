import * as PIXI from 'pixi.js';

import {App} from './app/app';
import {AppConfig} from './config/app.config';
import {ISceneBase} from './core/scene.base';
import {GameScene} from './scenes/game.scene';


class Game {

    private readonly app: App;
    private readonly gameScene: ISceneBase;

    constructor() {
        this.app = new App(new AppConfig());

        this.gameScene = new GameScene(this.app.application);
    }


    run() {
        //  Add the canvas that Pixi automatically created for you to the HTML document
        document.body.appendChild(this.app.application.view);

        this.gameScene.load(PIXI.loader);

        PIXI.loader.load(() => {
            this.gameScene.setup();
        });
    }
}

const game = new Game();

game.run();
