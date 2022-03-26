import 'reflect-metadata';
import { DatabaseInjector } from "../database/database.injector";
import { DependencyContainer } from "tsyringe";
import { AuthInjector } from 'auth/auth.injector';

export class Injector {
    static registerInjections(container: DependencyContainer) {

        //Database
        DatabaseInjector.registerInjections(container);

        AuthInjector.registerInjections(container);
    }
}
