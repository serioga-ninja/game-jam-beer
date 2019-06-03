import 'phaser';
import vocabulary from '../../../core/vocabulary';
import gameConfig from '../core/game.config';
import {BackgroundEntity} from '../entities/background.entity';
import {BorderEntity} from '../entities/border.entity';
import {EndOfThePath} from '../entities/end-of-the-path';
import {EnemyLaserEntity} from '../entities/enemy-laser.entity';
import {EnemyEntity} from '../entities/enemy.entity';
import {PlayerLaserEntity} from '../entities/player-laser.entity';
import {PlayerStatsEntity} from '../entities/player-stats.entity';
import {PlayerEntity} from '../entities/player.entity';
import {GameSceneProperties} from '../properties/game-scene.properties';
import {ScoreScene} from './score.scene';


export class GameScene extends Phaser.Scene {

    private left: BorderEntity;
    private right: BorderEntity;

    private player: PlayerEntity;
    private background: BackgroundEntity;
    private enemies: Phaser.GameObjects.Group;
    private endOfThePath: EndOfThePath;
    private playerStats: PlayerStatsEntity;

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
        this.left = new BorderEntity(this, GameSceneProperties.borderLeftPosition, 0, true);

        this.right = new BorderEntity(this, GameSceneProperties.borderRightPosition, 0);

        this.physics.add.collider(this.player, this.left);
        this.physics.add.collider(this.player, this.right);
    }

    private createTimers() {
        this.time.addEvent({
            delay: 2000,
            callback: () => {
                const enemy = new EnemyEntity(
                    this,
                    Phaser.Math.Between(BorderEntity.width + 50, gameConfig.width - BorderEntity.width),
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
        this.load.setBaseURL('/infection');
        this.load.image(BorderEntity.imageKey, BorderEntity.url);
        this.load.image(PlayerEntity.imageKey, PlayerEntity.url);
        this.load.image(EnemyEntity.imageKey, EnemyEntity.url);
        this.load.image(EnemyLaserEntity.imageKey, EnemyLaserEntity.url);
        this.load.image(PlayerLaserEntity.imageKey, PlayerLaserEntity.url);
        this.load.image(BackgroundEntity.imageKey, BackgroundEntity.url);
        this.load.image('virus-1', 'assets/virus-1.svg');
        this.load.image('virus-2', 'assets/virus-2.svg');
        this.load.image('virus-3', 'assets/virus-3.svg');
        this.load.image('virus-4', 'assets/virus-4.svg');
    }

    /**
     * is called when the assets are loaded and usually contains creation of the main game objects (background, enemy,
     * obstacles, enemies, etc.)
     */
    create(): void {
        this.background = new BackgroundEntity(this);
        this.player = new PlayerEntity(this, GameSceneProperties.userStartPosition.x, GameSceneProperties.userStartPosition.y);
        this.enemies = this.add.group();
        this.enemyLasers = this.add.group();
        this.playerLasers = this.add.group();
        this.endOfThePath = new EndOfThePath(this);
        this.playerStats = new PlayerStatsEntity(this, this.player);

        this.createBorders();
        this.createTimers();

        // kill enemy if it meets the users laser
        this.physics.add.overlap(this.playerLasers, this.enemies, (playerLaser: PlayerLaserEntity, enemy: EnemyEntity) => {
            if (enemy.receiveBullet(playerLaser)) {
                this.player.onEnemyDead(enemy);
                enemy.destroy();
            }
            playerLaser.destroy();
        });

        // kill user and enemy if they meets
        this.physics.add.overlap(this.player, this.enemies, (player: PlayerEntity, enemy: EnemyEntity) => {
            if (!player.getData(vocabulary.IS_DEAD) && !enemy.getData(vocabulary.IS_DEAD)) {
                player.explode();
                enemy.explode();
                enemy.destroy();
                this.scene.start(ScoreScene.key, {
                    points: player.getData(vocabulary.POINTS)
                });
            }
        });

        // on laser and player hit
        this.physics.add.overlap(this.player, this.enemyLasers, function (player: PlayerEntity, laser: EnemyLaserEntity) {
            player.receiveBullet(laser);
            laser.destroy();
        });

        // destroy enemies bullets and enemies in the end
        this.physics.add.collider(this.player, this.endOfThePath);

        this.physics.add.overlap(this.enemyLasers, this.endOfThePath, (laser: EnemyLaserEntity) => {
            if (!laser.getData(vocabulary.IS_DEAD)) {
                laser.destroy();
            }
        });

        this.physics.add.overlap(this.enemies, this.endOfThePath, (enemy: EnemyEntity) => {
            this.player.setData(vocabulary.POINTS, this.player.getData(vocabulary.POINTS) - enemy.getData(vocabulary.VALUE));
            enemy.explode();
            enemy.destroy();
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

        this.playerStats.preUpdate(time);
    }
}
