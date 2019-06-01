import {SpriteEntity} from '../../../core/entity/sprite.entity';
import vocabulary from '../../../core/vocabulary';
import {EnemyLaserEntity} from '../entities/enemy-laser.entity';
import {PlayerLaserEntity} from '../entities/player-laser.entity';

export abstract class SomethingEntity extends SpriteEntity {

    protected shootTimer?: Phaser.Time.TimerEvent;

    constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
        super(scene, x, y, key);

        this.setData(vocabulary.HEALTH, 100);
        this.setData(vocabulary.DAMAGE, 10);
    }


    explode() {
        if (this.getData(vocabulary.IS_DEAD)) return;

        // Set the texture to the explosion image, then play the animation
        // this.setTexture('sprExplosion');  // this refers to the same animation key we used when we added this.anims.create previously

        // this.play('sprExplosion'); // play the animation
        // pick a random explosion sound within the array we defined in this.sfx in SceneMain
        // this.scene.sfx.explosions[Phaser.Math.Between(0, this.scene.sfx.explosions.length - 1)].play();

        if (this.shootTimer !== undefined) {
            if (this.shootTimer) {
                this.shootTimer.remove(false);
            }
        }
        this.setAngle(0);
        this.body.setVelocity(0, 0);

        this.destroy();
        this.setData(vocabulary.IS_DEAD, true);
    }

    receiveBullet(bullet: PlayerLaserEntity | EnemyLaserEntity) {
        let currentHealth: number = this.getData(vocabulary.HEALTH);
        currentHealth -= bullet.getData(vocabulary.DAMAGE) as number;
        this.setData(vocabulary.HEALTH, currentHealth);

        if (currentHealth <= 0 && !this.getData(vocabulary.IS_DEAD)) {
            this.explode();
        }
    }
}
