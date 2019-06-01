import {SpriteEntity} from '../../../core/entity/sprite.entity';

export class EnemyLaserEntity extends SpriteEntity {
    public static get imageKey(): string {
        return 'enemy-bullet';
    }

    public static get url(): string {
        return 'assets/bullet.svg';
    }

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, EnemyLaserEntity.imageKey);

        this.body.velocity.y = 200;
        this.setDisplaySize(30, 60);
        this.setFlipY(true);
    }
}
