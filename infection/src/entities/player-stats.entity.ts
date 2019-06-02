import vocabulary from '../../../core/vocabulary';
import {PlayerEntity} from './player.entity';

export class PlayerStatsEntity extends Phaser.GameObjects.Group {

    private readonly score: Phaser.GameObjects.Text;
    private health: Phaser.GameObjects.Text;

    constructor(scene: Phaser.Scene, private player: PlayerEntity) {
        super(scene);

        this.score = scene.add.text(100, 10, `Your score is ${player.getData(vocabulary.POINTS)}`);
        this.health = scene.add.text(100, 25, `Your health is ${player.getData(vocabulary.HEALTH)}`);

        this.score.setActive(true);
        this.health.setActive(true);

        this.add(this.score);
        this.add(this.health);
    }

    preUpdate(time: number, delta?: number): void {
        this.score.setText(`Your score is ${this.player.getData(vocabulary.POINTS)}`);
        this.health.setText(`Your health is ${this.player.getData(vocabulary.HEALTH)}`);
    }


}
