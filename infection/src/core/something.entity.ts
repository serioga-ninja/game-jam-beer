import {SpriteEntity} from '../../../core/entity/sprite.entity';
import vocabulary from '../../../core/vocabulary';

export abstract class SomethingEntity extends SpriteEntity {

    protected shootTimer?: Phaser.Time.TimerEvent;

    explode(canDestroy: boolean) {
        if (!this.getData(vocabulary.IS_DEAD)) {
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
            // this.setAngle(0);
            this.body.setVelocity(0, 0);
            this.on('animationcomplete', function () {
                if (canDestroy) {
                    this.destroy();
                } else {
                    this.setVisible(false);
                }
            }, this);
            this.setData(vocabulary.IS_DEAD, true);
        }
    }
}
