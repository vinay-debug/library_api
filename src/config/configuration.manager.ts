import {
    AuthenticationType,
    AuthorizationType,
    Configurations,
    DatabaseFlavour,
    DatabaseORM,
    DatabaseType,
} from './configuration.types';
import * as configuration from '../app.config.json';

export class ConfigurationManager {
    static _config: Configurations = null;

    public static DatabaseFlavour = (): DatabaseFlavour => {
        return ConfigurationManager._config.Database.Flavour;
    };

    public static DatabaseType = (): DatabaseType => {
        return ConfigurationManager._config.Database.Type;
    };

    public static loadConfigurations = (): void => {
        ConfigurationManager._config = {
            BaseUrl: process.env.BASE_URL,
            SystemIdentifier: '',
            MaxUploadFileSize: 0,
            Auth: {
                Authentication: configuration.Auth.Authentication as AuthenticationType,
                Authorization: configuration.Auth.Authorization as AuthorizationType,
            },
            Database: {
                Type: configuration.Database.Type as DatabaseType,
                ORM: configuration.Database.ORM as DatabaseORM,
                Flavour: configuration.Database.Flavour as DatabaseFlavour,
            },
        };
    };

    public static Authentication = (): AuthenticationType => {
        return ConfigurationManager._config.Auth.Authentication;
    };

    public static Authorization = (): AuthorizationType => {
        return ConfigurationManager._config.Auth.Authorization;
    };

    public static MaxUploadFileSize = (): number => {
        return ConfigurationManager._config.MaxUploadFileSize;
    };
}
