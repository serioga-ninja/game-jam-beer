import 'phaser';
import {BorderEntity} from '../models/border.entity';
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
    }

    /**
     * is called before the scene objects are created, and it contains loading assets; these assets are cached, so when
     * the scene is restarted, they are not reloaded
     */
    preload(): void {
        this.load.image(BorderEntity.imageKey, BorderEntity.url);
        this.load.image(UserModel.imageKey, UserModel.url);
        this.load.image(EnemyModel.imageKey, EnemyModel.url);
    }

    /**
     * is called when the assets are loaded and usually contains creation of the main game objects (background, enemy,
     * obstacles, enemies, etc.)
     */
    create(): void {
        this.userModel = new UserModel(this, 300, 300);
        this.enemies.push(new EnemyModel(this, 300, 10));

        //#region Borders
        this.left = new BorderEntity(this);

        this.right = new BorderEntity(this);

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

        this.physics.add.collider(this.userModel, this.left);
        this.physics.add.collider(this.userModel, this.right);

        //#endregion
    }

    /**
     * is called every tick and contains the dynamic part of the scene — everything that moves, flashes, etc.
     */
    update(time: number): void {
        this.userModel.update(time);
    }
}
