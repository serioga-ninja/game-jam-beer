import {ImageEntity} from '../../../core/entity/image.entity';

export class BorderEntity extends ImageEntity {

    public static get width() {
        return 75;
    }

    public static get imageKey(): string {
        return 'border';
    }

    public static get url(): string {
        return 'assets/wall.png';
    }

    constructor(scene: Phaser.Scene, x: number, y: number, flip: boolean = false) {
        super(scene, x, y, BorderEntity.imageKey);

        this.setFlipX(flip);
        this.setDisplaySize(BorderEntity.width * 2, 1400);
        this.body.setImmovable(true);
    }

}
