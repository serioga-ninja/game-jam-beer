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
            this.application.stage.y += this.speed;
            this.bacillus.y -= this.speed;
        }
        if (this.keyboard.keyPressed('ArrowDown')) {
            this.application.stage.y -= this.speed;
            this.bacillus.y += this.speed;
        }
        if (this.keyboard.keyPressed('ArrowRight')) {
            this.application.stage.x -= this.speed;
            this.bacillus.x += this.speed;
        }
        if (this.keyboard.keyPressed('ArrowLeft')) {
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
