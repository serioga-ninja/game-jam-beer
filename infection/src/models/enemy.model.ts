import ArcadePhysics = Phaser.Physics.Arcade.ArcadePhysics;

export class EnemyModel {
    protected enemy: Phaser.Physics.Arcade.Image;

    get texture() {
        return this.enemy;
    }

    constructor(protected input: Phaser.Input.InputPlugin) {
    }

    preload(load: Phaser.Loader.LoaderPlugin) {
        load.image('enemy-cell', 'assets/enemy-cell.png');
    }

    create(physics: ArcadePhysics) {
        this.enemy = physics.add
            .image(400, 20, 'enemy-cell')
            .setVelocityY(100);
    }
}
