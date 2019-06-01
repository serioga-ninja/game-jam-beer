import {SpriteEntity} from '../../../core/entity/sprite.entity';
import {GameSceneProperties} from '../properties/game-scene.properties';

export class BackgroundEntity extends SpriteEntity {
    public static get imageKey(): string {
        return 'background';
    }

    public static get url(): string {
        return 'assets/bg.jpg';
    }

    constructor(scene: Phaser.Scene) {
        super(scene, 300, 350, BackgroundEntity.imageKey);
        // this.setDisplaySize(1200, 1400);
    }

}
