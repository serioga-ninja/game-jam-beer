import {SpriteEntity} from '../../../core/entity/sprite.entity';

export class PlayerLaserEntity extends SpriteEntity {
    public static get imageKey(): string {
        return 'player-bullet';
    }

    public static get url(): string {
        return 'assets/player-bullet.png';
    }

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, PlayerLaserEntity.imageKey);

        this.body.velocity.y = 200;
    }
}
