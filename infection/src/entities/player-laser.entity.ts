import {EnemyLaserEntity} from './enemy-laser.entity';

export class PlayerLaserEntity extends EnemyLaserEntity {
    public static get imageKey(): string {
        return 'enemy-bullet';
    }

    public static get url(): string {
        return 'assets/bullet.svg';
    }

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y,);

        this.body.velocity.y = -200;
        this.setDisplaySize(15, 30);
        this.setFlipY(false);
    }
}
