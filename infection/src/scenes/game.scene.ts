import 'phaser';
import {EnemyModel} from '../models/enemy.model';
import {UserModel} from '../models/user.model';

export class GameScene extends Phaser.Scene {

    private userModel: UserModel;
    private left: Phaser.Physics.Arcade.StaticGroup;
    private right: Phaser.Physics.Arcade.StaticGroup;

    private enemies: EnemyModel[];

    constructor() {
        super({
            key: 'GameScene'
        });

        this.enemies = [];
    }

    /**
     * is called when the scene starts; this function may accept parameters, which are passed from other scenes or game
     * by calling scene.start(key, [params])
     */
    init(params: any): void {
        this.userModel = new UserModel(this.input);
        this.enemies.push(new EnemyModel(this.input));
    }

    /**
     * is called before the scene objects are created, and it contains loading assets; these assets are cached, so when
     * the scene is restarted, they are not reloaded
     */
    preload(): void {
        this.userModel.preload(this.load);

        for (const enemy of this.enemies) {
            enemy.preload(this.load);
        }

        this.load.image('border', '/assets/border.png');
    }

    /**
     * is called when the assets are loaded and usually contains creation of the main game objects (background, enemy,
     * obstacles, enemies, etc.)
     */
    create(): void {
        this.userModel.create(this.physics);

        for (const enemy of this.enemies) {
            enemy.create(this.physics);
        }

        //#region Borders
        this.left = this.physics.add.staticGroup({
            key: 'border',
            frameQuantity: 60
        });

        this.right = this.physics.add.staticGroup({
            key: 'border',
            frameQuantity: 60
        });

        Phaser.Actions.PlaceOnLine(
            this.left.getChildren(),
            new Phaser.Geom.Line(100, 0, 100, 600)
        );

        Phaser.Actions.PlaceOnLine(
            this.right.getChildren(),
            new Phaser.Geom.Line(500, 0, 500, 600)
        );

        this.left.refresh();
        this.right.refresh();

        this.physics.add.collider(this.userModel.texture, this.left);
        this.physics.add.collider(this.userModel.texture, this.right);

        //#endregion
    }

    /**
     * is called every tick and contains the dynamic part of the scene — everything that moves, flashes, etc.
     */
    update(time: number): void {
        this.userModel.update(time);
    }
}
