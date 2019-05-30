import {SpriteEntity} from './sprite.entity';

export abstract class MovableSpriteEntity extends SpriteEntity {

    moveUp() {
        this.body.velocity.y = -this.getData('speed');
    }

    moveDown() {
        this.body.velocity.y = this.getData('speed');
    }

    moveLeft() {
        this.body.velocity.x = -this.getData('speed');
    }

    moveRight() {
        this.body.velocity.x = this.getData('speed');
    }

    update(time: number): void {
        this.body.setVelocity(0, 0);
    }
}
