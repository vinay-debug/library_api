import 'reflect-metadata';
import { Logger } from "../common/logger";
import { inject, injectable } from "tsyringe";
import { IDatabaseConnector } from "./database.connector.interface";

@injectable()
export class DatabaseConnector {

    constructor(@inject('IDatabaseConnector') private _db: IDatabaseConnector) {}
    
    public init = async (): Promise<boolean> => {
        try {
            await this._db.connect();
            return true;
        } catch (error) {
            Logger.instance().log('Create database error: ' + error.message);
            throw error;
        }
    };

    public dropDatabase = async (): Promise<boolean> => {
        try {
            await this._db.dropDatabase();
            return true;
        } catch (error) {
            Logger.instance().log('Drop database error: ' + error.message);
            return false;
        }
    };


}