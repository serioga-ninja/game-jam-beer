import * as express from 'express';
import * as http from 'http';
import * as path from 'path';
import infectionServer from './infection/server';
import morgan = require('morgan');

class App {

    // ref to Express instance
    public express: express.Application;

    // Run configuration methods on the Express instance.
    constructor() {
        this.express = express();
    }

    public init() {
        this.middleware();
        this.routes();
    }

    // Configure API endpoints.
    private routes(): void {
        // placeholder route handler
        this.express.use(express.static(path.join(process.cwd(), 'infection', 'assets')));

        this.express.use('/infection', infectionServer.router);
    }

    public start() {
        const server = http.createServer(this.express);
        const port = 3000;

        server.listen(port);

        server.on('error', (error: NodeJS.ErrnoException): void => {
            if (error.syscall !== 'listen') throw error;
            const bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;
            switch (error.code) {
                case 'EACCES':
                    console.error(`${bind} requires elevated privileges`);
                    process.exit(1);
                    break;
                case 'EADDRINUSE':
                    console.error(`${bind} is already in use`);
                    process.exit(1);
                    break;
                default:
                    throw error;
            }
        });

        server.on('listening', (): void => {
            const addr = server.address();
            const bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
            console.log(path.join(__dirname, 'infection', 'assets'));
            console.log(`Listening on ${bind}`);
        });
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(morgan('combined'));
    }
}

const app = new App();
app.init();
app.start();
