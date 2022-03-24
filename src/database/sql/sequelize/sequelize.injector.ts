import 'reflect-metadata';
import { DependencyContainer } from "tsyringe";
import { DatabaseConnector_Sequelize } from './database.connector.sequelize';
import { UserRepo } from './repositories/user.repo';


export class SequelizeInjector {
    static registerInjections(container : DependencyContainer) {

        container.register('IDatabaseConnector', DatabaseConnector_Sequelize)
        container.register('IUserRepo', UserRepo)
    }
}