
import "reflect-metadata";

import { Container } from "typescript-ioc";

import app from "./app";

const finapp: app = Container.get(app);
finapp.start();
