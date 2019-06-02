import 'phaser';
import gameConfig from './core/game.config';
import {GameScene} from './scenes/game.scene';
import {ScoreScene} from './scenes/score.scene';
import {WelcomeScene} from './scenes/welcome.scene';
import GameConfig = Phaser.Types.Core.GameConfig;

const config: GameConfig = {
    title: 'Infection',
    width: gameConfig.width,
    height: 700,
    parent: 'game',
    scene: [new WelcomeScene(), new GameScene(), new ScoreScene()],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    backgroundColor: '#000033'
};

export class InfectionGame extends Phaser.Game {
    constructor(config: GameConfig) {
        super(config);
    }
}

window.onload = () => {
    const game = new InfectionGame(config);
    document.getElementById('game').focus();
};
