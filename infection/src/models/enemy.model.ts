import {SpriteEntity} from '../../../core/entity/sprite.entity';

export class EnemyModel extends SpriteEntity {

    public static get imageKey(): string {
        return 'enemy-cell';
    }

    public static get url(): string {
        return 'assets/enemy-cell.png';
    }

    constructor(protected scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, EnemyModel.imageKey);

        this.body.velocity.y = 100;
    }
}
