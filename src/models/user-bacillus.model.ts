import config from '../config/app.config';
import {IEntityModel} from '../core/entity.model';
import {BacillusModel} from './bacillus.model';
import Application = PIXI.Application;

export class UserBacillusModel extends BacillusModel implements IEntityModel {

    //#regionPrivateProps
    //#endregionPrivateProps

    //#regionPublicProps
    //#endregionPublicProps

    //#regionStaticMethods
    //#endregionStaticMethods

    //#regionConstructor
    constructor(application: Application) {
        super(application);
    }

    //#endregionConstructor

    //#regionProtectedMethods
    protected movement() {
        if (this.keyboard.keyPressed('ArrowUp')) {
            // check if it out of bouds
            if (this.bacillus.y - this.speed < 0) return;

            this.application.stage.y += this.speed;
            this.bacillus.y -= this.speed;
        }
        if (this.keyboard.keyPressed('ArrowDown')) {
            // check if it out of bouds
            if (this.bacillus.y + this.speed > config.fieldHeight) return;

            this.application.stage.y -= this.speed;
            this.bacillus.y += this.speed;
        }
        if (this.keyboard.keyPressed('ArrowRight')) {
            // check if it out of bouds
            if (this.bacillus.x + this.speed > config.fieldWidth) return;

            this.application.stage.x -= this.speed;
            this.bacillus.x += this.speed;
        }
        if (this.keyboard.keyPressed('ArrowLeft')) {
            // check if it out of bouds
            if (this.bacillus.x - this.speed < 0) return;

            this.application.stage.x += this.speed;
            this.bacillus.x -= this.speed;
        }
    }

    //#endregion

    //#regionPrivateMethods
    //#endregionPrivateMethods

    //#regionPublicMethods
    onTick() {
        super.onTick();
        this.movement();
    }

    //#endregionPublicMethods
}
