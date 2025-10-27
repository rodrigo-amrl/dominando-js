
import express from 'express';
import routes from './routes.js';
import './database/index.js';
import Youch from 'youch';
import "express-async-errors"
import * as Sentry from '@sentry/node';
import { loadEnvFile } from 'node:process'
loadEnvFile('.env');

class App {
    constructor() {
        this.server = express();
        Sentry.init({
            dsn: process.env.SENTRY_DSN,
            sendDefaultPii: true,
        });

        this.middlewares();
        this.routes();
        this.exceptionHandler();
    }
    middlewares() {
        this.server.use(Sentry.Handlers.requestHandler());
        this.server.use(express.json());
    }
    routes() {
        this.server.use(routes)
        this.server.use(Sentry.Handlers.requestHandler());

    }
    exceptionHandler() {
        this.server.use(async (err, req, res, next) => {
            if (process.env.NODE_ENV === 'development') {
                const youch = new Youch(err, req);
                return res.status(500).json(await youch.toJSON());
            }
            return res.status(500).json({ error: 'Internal server error' });
        });
    }
}

export default new App().server;
