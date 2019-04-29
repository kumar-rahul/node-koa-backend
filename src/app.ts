import * as Koa from "koa";
import * as bodyParser from "koa-bodyparser";
import * as logger from "koa-logger";
import * as Router from "koa-router";

import { createConnection } from "typeorm";
import { Inject } from "typescript-ioc";

import Director from "./models/Director";
import Route from "./models/Route";
import DirectorRoutes from "./routes/DirectorRoutes";

export default class App {

    constructor(
        @Inject private directorRoutes: DirectorRoutes) { }

    private async createApp() {
        await createConnection({

            type: "mysql",
            host: "localhost",
            port: 3306,
            username: "root",
            password: "",           //password for the database
            database: "finanalytics",     //name of the database
            entities: [
                Director,                   //include models here
            ],
            synchronize: true,
        });

        const app: Koa = new Koa();
        const router: Router = new Router();

        //register router
        this.directorRoutes.register(router);

        app.use(logger());
        app.use(bodyParser());
        app.use(router.routes());
        app.use(router.allowedMethods());

        return Promise.resolve(app);
    }

    public async start() {
        const app = await this.createApp();
        console.log("Started listening on port 3000...");
        const server = app.listen(3000);
        return Promise.resolve(server);
    }

}
