import Loader = PIXI.loaders.Loader;
import Resource = PIXI.loaders.Resource;
import * as PIXI from 'pixi.js';
import {ISetupable} from './interfaces';

export interface ISceneBase extends ISetupable {
    load(loader: Loader): void;
}

export abstract class SceneBase {

    abstract load(loader: Loader): void;

    protected loadProgressHandler(loader: Loader, resource: Resource) {

        // Display the file `url` currently being loaded
        console.log('loading: ' + resource.url);

        // Display the percentage of files currently loaded
        console.log('progress: ' + loader.progress + '%');

        // If you gave your files names as the first argument
        // of the `add` method, you can access them like this
        // console.log("loading: " + resource.name);
    }
}
