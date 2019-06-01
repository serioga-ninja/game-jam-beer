import Key = Phaser.Input.Keyboard.Key;
import {MovableSpriteEntity} from '../core/movable-sprite.entity';
import vocabulary from '../../../core/vocabulary';
import {GameScene} from '../scenes/game.scene';
import {EnemyEntity} from './enemy.entity';
import {PlayerLaserEntity} from './player-laser.entity';

export class PlayerEntity extends MovableSpriteEntity {

    public static get imageKey(): string {
        return 'user';
    }

    public static get url(): string {
        return 'assets/proto_proto.svg';
    }

    protected cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    protected keySpace: Phaser.Input.Keyboard.Key;

    scene: GameScene;

    constructor(scene: GameScene, x: number, y: number) {
        super(scene, x, y, PlayerEntity.imageKey);

        scene.add.existing(this);
        this.scene.physics.world.enableBody(this, 0);

        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.keySpace = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.setData(vocabulary.SPEED, 300);

        this.setData(vocabulary.IS_SHOOTING, false);
        this.setData(vocabulary.TIMER_SHOOT_DELAY, 10);
        this.setData(vocabulary.TIMER_SHOOT_TICK, this.getData(vocabulary.TIMER_SHOOT_DELAY) - 1);
        this.setData(vocabulary.DAMAGE, 50);
        this.setData(vocabulary.POINTS, 0);

        this.setDisplaySize(40, 40);

    }

    preload() {

    }

    create() {
        debugger;

    }

    update(time: number): void {
        super.update(time);

        if (this.getData(vocabulary.IS_SHOOTING)) {
            if (this.getData(vocabulary.TIMER_SHOOT_TICK) < this.getData(vocabulary.TIMER_SHOOT_DELAY)) {
                this.setData(vocabulary.TIMER_SHOOT_TICK, this.getData(vocabulary.TIMER_SHOOT_TICK) + 1); // every game update, increase timerShootTick by one until we reach the value of timerShootDelay
            } else { // when the "manual timer" is triggered:
                const laser = new PlayerLaserEntity(this.scene, this.x, this.y);
                laser.setData(vocabulary.DAMAGE, this.getData(vocabulary.DAMAGE));
                this.scene.playerLasers.add(laser);

                // this.scene.sfx.laser.play(); // play the laser sound effect
                this.setData(vocabulary.TIMER_SHOOT_TICK, 0);
            }
        }
    }

    onEnemyDead(enemy: EnemyEntity) {
        this.setData(vocabulary.POINTS, this.getData(vocabulary.POINTS) + enemy.getData(vocabulary.VALUE));
        console.log(this.getData(vocabulary.POINTS));
    }
}
