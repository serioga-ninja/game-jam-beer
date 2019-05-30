export class BorderEntity extends Phaser.Physics.Arcade.StaticGroup {
    public static get imageKey(): string {
        return 'border';
    }

    public static get url(): string {
        return 'assets/border.png';
    }

    constructor(scene: Phaser.Scene) {
        super(scene.physics.world, scene, {
            key: 'border',
            frameQuantity: 60
        });
    }

}
