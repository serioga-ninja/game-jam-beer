import * as express from 'express';
import {Request, Response, Router} from 'express';
import * as path from 'path';

class InfectionServer {

    public router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    infection(request: Request, response: Response) {
        response.sendFile(path.join(process.cwd(), 'dist', 'index.html'));
    }

    init() {
        this.router.use(express.static(path.join(process.cwd(), 'dist')));
        this.router.use('/assets', express.static(path.join(process.cwd(), 'infection', 'assets')));

        this.router.get('/', this.infection.bind(this));
    }
}

const infectionServer = new InfectionServer();

export default infectionServer;
