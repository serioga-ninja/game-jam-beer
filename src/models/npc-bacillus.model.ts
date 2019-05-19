import {IEntityModel} from '../core/entity.model';
import {BacillusModel, IBacillusModel, IBacillusOverrideOptions} from './bacillus.model';
import Application = PIXI.Application;

export class NpcBacillusModel extends BacillusModel implements IBacillusModel {

    //#regionPrivateProps
    //#endregionPrivateProps

    //#regionPublicProps
    //#endregionPublicProps

    //#regionStaticMethods
    //#endregionStaticMethods

    //#regionConstructor
    constructor(application: Application, options: IBacillusOverrideOptions) {
        super(application, options);
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
