import {SomethingEntity} from '../core/something.entity';
import {GameScene} from '../scenes/game.scene';
import {EnemyLaserEntity} from './enemy-laser.entity';

export class EnemyEntity extends SomethingEntity {

    public static get imageKey(): string {
        return 'enemy-cell';
    }

    public static get url(): string {
        return 'assets/enemy-cell.png';
    }

    constructor(protected scene: GameScene, x: number, y: number) {
        super(scene, x, y, EnemyEntity.imageKey);

        this.body.velocity.y = Phaser.Math.Between(50, 100);

        this.shootTimer = this.scene.time.addEvent({
            delay: 1000,
            callback: () => {
                const laser = new EnemyLaserEntity(
                    this.scene,
                    this.x,
                    this.y
                );
                laser.setScale(this.scaleX);
                this.scene.enemyLasers.add(laser);
            },
            callbackScope: this,
            loop: true
        });
    }

    onDestroy() {
        if (this.shootTimer !== undefined) {
            if (this.shootTimer) {
                this.shootTimer.remove(false);
            }
        }
    }
}
