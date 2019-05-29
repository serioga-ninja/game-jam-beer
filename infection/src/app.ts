import 'phaser';
import {GameScene} from './scenes/game.scene';
import {ScoreScene} from './scenes/score.scene';
import {WelcomeScene} from './scenes/welcome.scene';
import GameConfig = Phaser.Types.Core.GameConfig;

const config: GameConfig = {
    title: 'Starfall',
    width: 800,
    height: 600,
    parent: 'game',
    scene: [new GameScene(), new ScoreScene()],
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
};
