import Key = Phaser.Input.Keyboard.Key;
import ArcadePhysics = Phaser.Physics.Arcade.ArcadePhysics;

export class UserModel {

    protected cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    protected keySpace: Phaser.Input.Keyboard.Key;
    protected player: Phaser.Physics.Arcade.Image;

    get texture() {
        return this.player;
    }

    constructor(protected input: Phaser.Input.InputPlugin) {
    }

    preload(load: Phaser.Loader.LoaderPlugin) {
        load.image('star', 'assets/star.png');
    }


    create(physics: ArcadePhysics) {
        this.player = physics.add.image(400, 300, 'block');
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update(time: number): void {
        this.player.setVelocity(0);

        if ((this.cursors.left || {} as Key).isDown) {
            this.player.setVelocityX(-300);
        } else if ((this.cursors.right || {} as Key).isDown) {
            this.player.setVelocityX(300);
        }

        if ((this.cursors.up || {} as Key).isDown) {
            this.player.setVelocityY(-300);
        } else if ((this.cursors.down || {} as Key).isDown) {
            this.player.setVelocityY(300);
        }

        if (this.keySpace.isDown) {
            this.fire();
        }
    }

    fire() {
        console.log('fire');
    }
}
