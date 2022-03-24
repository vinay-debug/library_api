import 'reflect-metadata';
import { DependencyContainer } from "tsyringe";
import { DatabaseConnector_Sequelize } from './database.connector.sequelize';
import { UserRepo } from './repositories/user.repo';
import { UserRoleRepo } from './repositories/user.role.repo';


export class SequelizeInjector {
    static registerInjections(container : DependencyContainer) {

        container.register('IDatabaseConnector', DatabaseConnector_Sequelize)
        container.register('IUserRepo', UserRepo)
        container.register('IRoleRepo', UserRoleRepo)
    }
}