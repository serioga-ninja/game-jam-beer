import {ImageEntity} from '../../../core/entity/image.entity';
import gameConfig from '../core/game.config';

export class EndOfThePath extends ImageEntity {

    constructor(scene: Phaser.Scene) {
        super(scene, 0, gameConfig.height + 10, 'endofthepath');

        this.setDisplaySize(gameConfig.width * 2, 10);
        this.body.setImmovable(true);
        this.setAlpha(0);
    }

}
