import * as PIXI from 'pixi.js';

//Create a Pixi Application
let app = new PIXI.Application({
        width: 256,
        height: 256,
        antialias: true,
        transparent: false,
        resolution: 1
    }
);

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

//load an image and run the `setup` function when it's done
PIXI.loader
    .add([
        'sprites/cat.png'
    ])
    .on('progress', loadProgressHandler)
    .load(setup);

function loadProgressHandler(loader, resource) {

    //Display the file `url` currently being loaded
    console.log('loading: ' + resource.url);

    //Display the percentage of files currently loaded
    console.log('progress: ' + loader.progress + '%');

    //If you gave your files names as the first argument
    //of the `add` method, you can access them like this
    //console.log("loading: " + resource.name);
}

let cat;

//This `setup` function will run when the image has loaded
function setup() {

    //Create the cat sprite
    cat = new PIXI.Sprite(PIXI.loader.resources['sprites/cat.png'].texture);

    //Change the sprite's position
    cat.x = 96;
    cat.y = 96;

    //Add the cat to the stage
    app.stage.addChild(cat);
    app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta) {

    //Move the cat 1 pixel
    cat.x += 1;
}
