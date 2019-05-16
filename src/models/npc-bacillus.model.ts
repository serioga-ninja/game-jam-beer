import {IEntityModel} from '../core/entity.model';
import {BacillusModel} from './bacillus.model';
import Application = PIXI.Application;

export class NpcBacillusModel extends BacillusModel implements IEntityModel {

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
    protected logic() {

    }

    //#endregion

    //#regionPrivateMethods
    //#endregionPrivateMethods

    //#regionPublicMethods
    onTick() {
        super.onTick();
        this.logic();
    }

    //#endregionPublicMethods
}
