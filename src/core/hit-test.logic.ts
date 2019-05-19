import Graphics = PIXI.Graphics;

interface IObjectProps {
    centerX: number;
    centerY: number;
    halfWidth: number;
    halfHeight: number;
}

interface ICircleProps {
    centerX: number;
    centerY: number;
    radius: number;
}

export class HitTestLogic {
    hitTestRectangle(r1: Graphics, r2: Graphics) {

        //Define the variables we'll need to calculate
        let hit = false;

        const propsR1: IObjectProps = {
            centerX: r1.x + r1.width / 2,
            centerY: r1.y + r1.height / 2,
            halfWidth: r1.width / 2,
            halfHeight: r1.height / 2
        };
        const propsR2: IObjectProps = {
            centerX: r2.x + r2.width / 2,
            centerY: r2.y + r2.height / 2,
            halfWidth: r2.width / 2,
            halfHeight: r2.height / 2
        };

        //Calculate the distance vector between the sprites
        const vx: number = propsR1.centerX - propsR2.centerX;
        const vy: number = propsR1.centerY - propsR2.centerY;

        //Figure out the combined half-widths and half-heights
        const combinedHalfWidths: number = propsR1.halfWidth + propsR2.halfWidth;
        const combinedHalfHeights: number = propsR1.halfHeight + propsR2.halfHeight;

        //Check for a collision on the x axis
        if (Math.abs(vx) < combinedHalfWidths) {

            //A collision might be occurring. Check for a collision on the y axis
            if (Math.abs(vy) < combinedHalfHeights) {

                //There's definitely a collision happening
                hit = true;
            } else {

                //There's no collision on the y axis
                hit = false;
            }
        } else {

            //There's no collision on the x axis
            hit = false;
        }

        //`hit` will be either `true` or `false`
        return hit;
    }

    hitTestCircle(r1: Graphics, r2: Graphics) {
        const propsR1: ICircleProps = {
            centerX: r1.x + r1.width / 2,
            centerY: r1.y + r1.height / 2,
            radius: r1.height / 2
        };
        const propsR2: ICircleProps = {
            centerX: r2.x + r2.width / 2,
            centerY: r2.y + r2.height / 2,
            radius: r2.height / 2
        };

        const distance: number = Math.sqrt(
            Math.pow(r2.x - r1.x, 2) + Math.pow(r2.y - r1.y, 2)
        );

        return distance < (propsR1.radius + propsR2.radius);
    }
}
