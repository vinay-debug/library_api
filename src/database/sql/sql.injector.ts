import { DependencyContainer } from 'tsyringe';
import { DatabaseConnector_Sequelize } from './sequelize/database.connector.sequelize';
import { UserRepo } from './sequelize/repositories/user.repo';
import { UserRoleRepo } from './sequelize/repositories/user.role.repo';

export class SQLInjector {
    static registerInjections(container: DependencyContainer) {
        container.register('IDatabaseConnector', DatabaseConnector_Sequelize);

        container.register('IUserRepo', UserRepo);
        container.register('IRoleRepo', UserRoleRepo);
    }
}
