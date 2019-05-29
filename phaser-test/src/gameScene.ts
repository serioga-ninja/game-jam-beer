import 'phaser';

export class GameScene extends Phaser.Scene {

    delta: number;
    lastStarTime: number;
    starsCaught: number;
    starsFallen: number;
    sand: Phaser.Physics.Arcade.StaticGroup;
    info: Phaser.GameObjects.Text;

    constructor() {
        super({
            key: 'GameScene'
        });
    }

    /**
     * is called when the scene starts; this function may accept parameters, which are passed from other scenes or game
     * by calling scene.start(key, [params])
     * @param params
     */
    init(params: any): void {
        this.delta = 1000;
        this.lastStarTime = 0;
        this.starsCaught = 0;
        this.starsFallen = 0;
    }

    /**
     * is called before the scene objects are created, and it contains loading assets; these assets are cached, so when
     * the scene is restarted, they are not reloaded
     */
    preload(): void {
        this.load.setBaseURL(
            'https://raw.githubusercontent.com/mariyadavydova/' +
            'starfall-phaser3-typescript/master/');
        this.load.image('star', 'assets/star.png');
        this.load.image('sand', 'assets/sand.jpg');

    }

    /**
     * is called when the assets are loaded and usually contains creation of the main game objects (background, enemy,
     * obstacles, enemies, etc.)
     */
    create(): void {
        this.sand = this.physics.add.staticGroup({
            key: 'sand',
            frameQuantity: 20
        });
        Phaser.Actions.PlaceOnLine(
            this.sand.getChildren(),
            new Phaser.Geom.Line(20, 580, 820, 580)
        );
        this.sand.refresh();
        this.info = this.add.text(10, 10, '',
            {font: '24px Arial Bold', fill: '#FBFBAC'}
        );

    }

    /**
     * is called every tick and contains the dynamic part of the scene — everything that moves, flashes, etc.
     * @param time
     */
    update(time: number): void {
        var diff: number = time - this.lastStarTime;
        if (diff > this.delta) {
            this.lastStarTime = time;
            if (this.delta > 500) {
                this.delta -= 20;
            }
            this.emitStar();
        }
        this.info.text =
            this.starsCaught + ' caught - ' +
            this.starsFallen + ' fallen (max 3)';
    }

    private onClick(star: Phaser.Physics.Arcade.Image): () => void {
        return function () {
            star.setTint(0x00ff00);
            star.setVelocity(0, 0);
            this.starsCaught += 1;
            this.time.delayedCall(100, function (star: Phaser.Physics.Arcade.Image) {
                star.destroy();
            }, [star], this);
        }
    }

    private onFall(star: Phaser.Physics.Arcade.Image): () => void {
        return function () {
            star.setTint(0xff0000);
            this.starsFallen += 1;
            this.time.delayedCall(100, function (star: Phaser.Physics.Arcade.Image) {
                star.destroy();
                if (this.starsFallen > 2) {
                    this.scene.start(
                        'ScoreScene',
                        {starsCaught: this.starsCaught}
                    );
                }
            }, [star], this);
        }
    }

    private emitStar(): void {
        var star: Phaser.Physics.Arcade.Image;
        var x = Phaser.Math.Between(25, 775);
        var y = 26;
        star = this.physics.add.image(x, y, 'star');
        star.setDisplaySize(50, 50);
        star.setVelocity(0, 200);
        star.setInteractive();
        star.on('pointerdown', this.onClick(star), this);
        this.physics.add.collider(star, this.sand, this.onFall(star), undefined, this);
    }

}
