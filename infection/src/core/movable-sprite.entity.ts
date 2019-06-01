import vocabulary from '../../../core/vocabulary';
import {SomethingEntity} from './something.entity';

export abstract class MovableSpriteEntity extends SomethingEntity {

    protected keyW: Phaser.Input.Keyboard.Key;
    protected keyS: Phaser.Input.Keyboard.Key;
    protected keyA: Phaser.Input.Keyboard.Key;
    protected keyD: Phaser.Input.Keyboard.Key;
    protected keySpace: Phaser.Input.Keyboard.Key;

    constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
        super(scene, x, y, key);

        this.keyW = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.keyS = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.keyA = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.keyD = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.keySpace = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    moveUp() {
        this.body.velocity.y = -this.getData('speed');
    }

    moveDown() {
        this.body.velocity.y = this.getData('speed');
    }

    moveLeft() {
        this.body.velocity.x = -this.getData('speed');
    }

    moveRight() {
        this.body.velocity.x = this.getData('speed');
    }

    update(time: number): void {
        this.body.setVelocity(0, 0);

        if (this.keyW.isDown) {
            this.moveUp();
        } else if (this.keyS.isDown) {
            this.moveDown();
        }
        if (this.keyA.isDown) {
            this.moveLeft();
        } else if (this.keyD.isDown) {
            this.moveRight();
        }

        if (this.keySpace.isDown) {
            this.setData(vocabulary.IS_SHOOTING, true);
        } else {
            this.setData(vocabulary.TIMER_SHOOT_TICK, this.getData(vocabulary.TIMER_SHOOT_DELAY) - 1);
            this.setData(vocabulary.IS_SHOOTING, false);
        }
    }
}
