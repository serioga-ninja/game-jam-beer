import config from '../config/app.config';
import {IEntityModel} from '../core/entity.model';
import {BacillusModel, IBacillusModel, IBacillusOverrideOptions} from './bacillus.model';
import Application = PIXI.Application;
import Rectangle = PIXI.Rectangle;

export class NpcBacillusModel extends BacillusModel implements IBacillusModel {

    //#regionPrivateProps
    protected direction: number;
    protected turningSpeed: number;
    protected bacillusBoundsPadding: number;
    protected bacillusBounds: Rectangle;
    //#endregionPrivateProps

    //#regionPublicProps
    //#endregionPublicProps

    //#regionStaticMethods
    //#endregionStaticMethods

    //#regionConstructor
    constructor(application: Application, options: IBacillusOverrideOptions) {
        super(application, options);

        // create a random direction in radians. This is a number between 0 and PI*2 which is the equivalent of 0 - 360 degrees
        this.direction = Math.random() * Math.PI * 2;

        // this number will be used to modify the direction of the dude over time
        this.turningSpeed = Math.random() - 0.8;

        this.bacillusBoundsPadding = 100;
        this.bacillusBounds = new PIXI.Rectangle(-this.bacillusBoundsPadding,
            -this.bacillusBoundsPadding,
            config.fieldWidth + this.bacillusBoundsPadding * 2,
            config.fieldHeight + this.bacillusBoundsPadding * 2);
    }

    //#endregionConstructor

    //#regionProtectedMethods

    //#endregion

    //#regionPrivateMethods
    //#endregionPrivateMethods

    //#regionPublicMethods
    setup(): void {
        super.setup();
    }

    onTick() {
        this.direction += this.turningSpeed * 0.01;
        this.bacillus.x += Math.sin(this.direction) * this.speed;
        this.bacillus.y += Math.cos(this.direction) * this.speed;
        this.bacillus.rotation = -this.direction - Math.PI / 2;

        // wrap the dudes by testing their bounds...
        if (this.bacillus.x < this.bacillusBounds.x) {
            this.bacillus.x += this.bacillusBounds.width;
        } else if (this.bacillus.x > this.bacillusBounds.x + this.bacillusBounds.width) {
            this.bacillus.x -= this.bacillusBounds.width;
        }

        if (this.bacillus.y < this.bacillusBounds.y) {
            this.bacillus.y += this.bacillusBounds.height;
        } else if (this.bacillus.y > this.bacillusBounds.y + this.bacillusBounds.height) {
            this.bacillus.y -= this.bacillusBounds.height;
        }
    }

    //#endregionPublicMethods
}
