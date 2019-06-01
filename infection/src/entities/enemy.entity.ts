import {SomethingEntity} from '../core/something.entity';
import {GameScene} from '../scenes/game.scene';
import {EnemyLaserEntity} from './enemy-laser.entity';

export class EnemyEntity extends SomethingEntity {

    public static get width() {
        return 20;
    }

    public static get height() {
        return 20;
    }

    public static get imageKey(): string {
        return 'virus-1';
    }

    public static get url(): string {
        return 'assets/virus-1.svg';
    }

    constructor(protected scene: GameScene, x: number, y: number) {
        super(scene, x, y, EnemyEntity.imageKey);

        this.body.velocity.y = Phaser.Math.Between(50, 100);

        this.shootTimer = this.scene.time.addEvent({
            delay: 2000,
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

        this.setDisplaySize(50, 50);
    }

    onDestroy() {
        if (this.shootTimer !== undefined) {
            if (this.shootTimer) {
                this.shootTimer.remove(false);
            }
        }
    }
}
