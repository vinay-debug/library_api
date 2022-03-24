import 'reflect-metadata';
import { container, DependencyContainer } from 'tsyringe';
import { Authenticator } from '../auth/authenticator';
import { Logger } from '../common/logger';
import { Authorizer } from '../auth/authorizer';
import { DatabaseConnector } from '../database/database.connector';
import { Injector } from './injector';
import { Seeder } from './seeder';

export class Loader {
    private static _container: DependencyContainer = container;
    private static _databaseConnector: DatabaseConnector = null;


    public static get container() {
        return Loader._container;
    }

    private static _authorizer: Authorizer = null;

    public static get authorizer() {
        return Loader._authorizer;
    }

    public static get databaseConnector() {
        return Loader._databaseConnector;
    }

    private static _authenticator: Authenticator = null;

    public static get authenticator() {
        return Loader._authenticator;
    }

    private static _seeder: Seeder = null;

    public static get seeder() {
        return Loader._seeder;
    }

    public static init = async (): Promise<boolean> => {
        try {
            //Register injections here...
            Injector.registerInjections(container);

            Loader._databaseConnector = container.resolve(DatabaseConnector);

            Loader._seeder = container.resolve(Seeder)

            return true;
        } catch (error) {
            Logger.instance().log(error.message);
            return false;
        }
    };
}
