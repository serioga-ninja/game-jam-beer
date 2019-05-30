import 'phaser';
import vocabulary from '../../../core/vocabulary';
import {BorderEntity} from '../entities/border.entity';
import {EnemyLaserEntity} from '../entities/enemy-laser.entity';
import {EnemyEntity} from '../entities/enemy.entity';
import {PlayerLaserEntity} from '../entities/player-laser.entity';
import {PlayerEntity} from '../entities/player.entity';
import {GameSceneProperties} from '../properties/game-scene.properties';


export class GameScene extends Phaser.Scene {

    private left: Phaser.Physics.Arcade.StaticGroup;
    private right: Phaser.Physics.Arcade.StaticGroup;

    private player: PlayerEntity;
    private enemies: Phaser.GameObjects.Group;
    public enemyLasers: Phaser.GameObjects.Group;
    public playerLasers: Phaser.GameObjects.Group;

    constructor() {
        super({
            key: 'GameScene'
        });
    }

    /**
     * Creates the border for the scene that doesn't allow user to
     */
    private createBorders() {
        this.left = new BorderEntity(this);

        this.right = new BorderEntity(this);

        Phaser.Actions.PlaceOnLine(
            this.left.getChildren(),
            new Phaser.Geom.Line(GameSceneProperties.borderLeftPosition, 0, 100, 600)
        );

        Phaser.Actions.PlaceOnLine(
            this.right.getChildren(),
            new Phaser.Geom.Line(GameSceneProperties.borderRightPosition, 0, 500, 600)
        );

        this.left.refresh();
        this.right.refresh();

        this.physics.add.collider(this.player, this.left);
        this.physics.add.collider(this.player, this.right);
    }

    private createTimers() {
        this.time.addEvent({
            delay: 1000,
            callback: () => {
                const enemy = new EnemyEntity(
                    this,
                    Phaser.Math.Between(GameSceneProperties.borderLeftPosition, GameSceneProperties.borderRightPosition),
                    0
                );

                this.enemies.add(enemy);
            },
            callbackScope: this,
            loop: true
        });
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
        this.load.image(PlayerEntity.imageKey, PlayerEntity.url);
        this.load.image(EnemyEntity.imageKey, EnemyEntity.url);
        this.load.image(PlayerLaserEntity.imageKey, PlayerLaserEntity.url);
    }

    /**
     * is called when the assets are loaded and usually contains creation of the main game objects (background, enemy,
     * obstacles, enemies, etc.)
     */
    create(): void {
        this.player = new PlayerEntity(this, GameSceneProperties.userStartPosition.x, GameSceneProperties.userStartPosition.y);
        this.enemies = this.add.group();
        this.enemyLasers = this.add.group();
        this.playerLasers = this.add.group();

        this.createBorders();
        this.createTimers();

        // kill enemy if it meets the users laser
        this.physics.add.collider(this.playerLasers, this.enemies, function (playerLaser: PlayerLaserEntity, enemy: EnemyEntity) {
            if (enemy) {
                if (enemy.onDestroy !== undefined) {
                    enemy.onDestroy();
                }

                enemy.explode(true);
                playerLaser.destroy();
            }
        });

        // kill user and enemy if they meets
        this.physics.add.overlap(this.player, this.enemies, function (player: PlayerEntity, enemy: EnemyEntity) {
            if (!player.getData(vocabulary.IS_DEAD) && !enemy.getData(vocabulary.IS_DEAD)) {
                player.explode(false);
                enemy.explode(true);
            }
        });

        // on laser and player hit
        this.physics.add.overlap(this.player, this.enemyLasers, function (player: PlayerEntity, laser: EnemyLaserEntity) {
            if (!player.getData(vocabulary.IS_DEAD) && !laser.getData(vocabulary.IS_DEAD)) {
                player.explode(false);
                laser.destroy();
            }
        });
    }

    /**
     * is called every tick and contains the dynamic part of the scene — everything that moves, flashes, etc.
     */
    update(time: number): void {
        if (!this.player.getData(vocabulary.IS_DEAD)) {
            this.player.update(time);
        } else {
            this.player.setData(vocabulary.TIMER_SHOOT_TICK, this.player.getData(vocabulary.TIMER_SHOOT_DELAY) - 1);
            this.player.setData(vocabulary.IS_SHOOTING, false);
        }
    }
}
