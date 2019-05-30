import Key = Phaser.Input.Keyboard.Key;
import {MovableSpriteEntity} from '../../../core/entity/movable-sprite.entity';

export class UserModel extends MovableSpriteEntity {

    public static get imageKey(): string {
        return 'user';
    }

    public static get url(): string {
        return 'assets/user.png';
    }

    protected cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    protected keySpace: Phaser.Input.Keyboard.Key;

    constructor(protected scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, UserModel.imageKey);

        scene.add.existing(this);
        this.scene.physics.world.enableBody(this, 0);

        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.keySpace = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.setData('speed', 300);

    }

    preload() {

    }

    create() {
        debugger;

    }

    update(time: number): void {
        super.update(time);

        if ((this.cursors.left || {} as Key).isDown) {
            this.moveLeft();
        } else if ((this.cursors.right || {} as Key).isDown) {
            this.moveRight();
        }

        if ((this.cursors.up || {} as Key).isDown) {
            this.moveUp();
        } else if ((this.cursors.down || {} as Key).isDown) {
            this.moveDown();
        }

        if (this.keySpace.isDown) {
            this.fire();
        }
    }

    fire() {
        // this.setPosition(x, y - 50);
        //
        // this.setActive(true);
        // this.setVisible(true);
    }
}
