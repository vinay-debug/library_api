import { Logger } from "../../../common/logger";
import { IDatabaseConnector } from "../../../database/database.connector.interface";
import { DbConfig } from "./database.config";
import { ConfigurationManager } from "../../../config/configuration.manager";
import { Dialect } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { MysqlClient } from "./dilect.clients/mysql.client";
import { PostgresqlClient } from "./dilect.clients/postgresql.client";

export class DatabaseConnector_Sequelize implements IDatabaseConnector {

    private _sequelize: Sequelize = null;

    connect = async (): Promise<boolean> => {
        try {
            const config = DbConfig.config;
            const dialect: Dialect = this.getDialect();

            const modelsPath = [
                __dirname + '/models'
            ];
            const options = {
                host    : config.host,
                dialect : dialect,
                models  : modelsPath,
                pool    : {
                    max     : config.pool.max,
                    min     : config.pool.min,
                    acquire : config.pool.acquire,
                    idle    : config.pool.idle,
                },
                logging : false, //TODO: Please provide a function here to handle logging...
            };
            const sequelize = new Sequelize(config.database, config.username, config.password, options);
            this._sequelize = sequelize;

            Logger.instance().log(`Connecting to database '${config.database}' ...`);
            Logger.instance().log(`Database flavour: ${config.dialect}`);
            Logger.instance().log(`Database host: ${config.host}`);

            await this.createDatabase();
            await this._sequelize.authenticate();
            await this._sequelize.sync({ alter: true });

            Logger.instance().log(`Connected to database.`);

            return true
        } catch (error) {
            Logger.instance().log(error.message)
            return false
        }
    }
    sync(): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    createDatabase = async (): Promise<boolean> => {
        try {
            const client = this.getClient();
            await client.createDb();
            return true;
        } catch (error) {
            Logger.instance().log(error.message);
        }
        return false;
    }
    dropDatabase = async(): Promise<boolean> => {
        try {
            const client = this.getClient();
            await client.dropDb();
            return true;
        } catch (error) {
            Logger.instance().log(error.message);
        }
        return false;
    }
    executeQuery(query: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    migrate(): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    //Private methods

    private getDialect(): Dialect {

        let dialect: Dialect = 'postgres';
        const flavour = ConfigurationManager.DatabaseFlavour();

        if (flavour === 'MySQL') {
            dialect = 'mysql';
        }
        if (flavour === 'PostGreSQL') {
            dialect = 'postgres';
        }

        return dialect;
    }

    private getClient() {

        const flavour = ConfigurationManager.DatabaseFlavour();

        if (flavour === 'MySQL') {
            return MysqlClient;
        }
        if (flavour === 'PostGreSQL') {
            return PostgresqlClient;
        }
        return PostgresqlClient;
    }

    
}