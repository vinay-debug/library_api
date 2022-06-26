import 'reflect-metadata';
import { DependencyContainer } from "tsyringe";
import { DatabaseConnector_Sequelize } from './database.connector.sequelize';
import { AuthorRepo } from './repositories/author.repo';
import { BookBorrowLogRepo } from './repositories/book.borrow.log.repo';
import { BookCopyRepo } from './repositories/book.copy.repo';
import { BookRepo } from './repositories/book.repo';
import { RolePrivilegeRepo } from './repositories/role.privilege.repo';
import { UserRepo } from './repositories/user.repo';
import { UserRoleRepo } from './repositories/user.role.repo';

export class SequelizeInjector {
    static registerInjections(container : DependencyContainer) {

        container.register('IDatabaseConnector', DatabaseConnector_Sequelize);
        container.register('IUserRepo', UserRepo);
        container.register('IRoleRepo', UserRoleRepo);
        container.register('IRolePrivilegeRepo', RolePrivilegeRepo);
        container.register('IBookRepo', BookRepo);
        container.register('IBookCopyRepo', BookCopyRepo);
        container.register('IAuthorRepo', AuthorRepo);
        container.register('IBookBorrowLogRepo', BookBorrowLogRepo);
    }
}
