import Key = Phaser.Input.Keyboard.Key;
import ArcadePhysics = Phaser.Physics.Arcade.ArcadePhysics;

export class UserModel extends Phaser.GameObjects.Sprite {

    public static get imageKey(): string {
        return 'user';
    }

    public static get url(): string {
        return 'assets/user.png';
    }

    protected cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    protected keySpace: Phaser.Input.Keyboard.Key;

    constructor(protected inputPlugin: Phaser.Input.InputPlugin, protected scene: Phaser.Scene) {
        super(scene, 300, 500, 'user');

        scene.add.existing(this);
        this.scene.physics.world.enableBody(this, 0);

        this.cursors = this.inputPlugin.keyboard.createCursorKeys();
        this.keySpace = this.inputPlugin.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    }

    preload() {

    }

    create() {
        debugger;

    }

    update(time: number): void {
        // this.setVelocity(0);
        this.body.velocity.y = 0;

        if ((this.cursors.left || {} as Key).isDown) {
            // this.setVelocityX(-300);
            this.body.velocity.x += 100;
        } else if ((this.cursors.right || {} as Key).isDown) {
            // this.setVelocityX(300);
        }

        if ((this.cursors.up || {} as Key).isDown) {
            // this.setVelocityY(-300);
        } else if ((this.cursors.down || {} as Key).isDown) {
            // this.setVelocityY(300);
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
