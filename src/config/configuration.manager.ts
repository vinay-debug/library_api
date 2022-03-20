import { AuthenticationType, AuthorizationType, Configurations,
     DatabaseFlavour, DatabaseORM, DatabaseType } from './configuration.types';
import * as AppConfig from '../app.config.json';

export class ConfigurationManager {
    static _config: Configurations = null;

    public static loadConfigurations = (): void => {
        ConfigurationManager._config = {
            BaseUrl: process.env.BASE_URL,
            SystemIdentifier: '',
            MaxUploadFileSize: 0,
            Auth: {
                Authentication: AppConfig.Auth.Authentication as AuthenticationType,
                Authorization: AppConfig.Auth.Authorization as AuthorizationType,
            },
            Database : {
                Type    : AppConfig.Database.Type as DatabaseType,
                ORM     : AppConfig.Database.ORM as DatabaseORM,
                Flavour : AppConfig.Database.Flavour as DatabaseFlavour,
            },
        };
    };

    public static Authentication = (): AuthenticationType => {
        return ConfigurationManager._config.Auth.Authentication;
    };

    public static Authorization = (): AuthorizationType => {
        return ConfigurationManager._config.Auth.Authorization;
    };

    public static DatabaseFlavour = (): DatabaseFlavour => {
        return ConfigurationManager._config.Database.Flavour;
    };

    public static MaxUploadFileSize = (): number => {
        return ConfigurationManager._config.MaxUploadFileSize;
    };

    public static DatabaseORM = (): DatabaseORM => {
        return ConfigurationManager._config.Database.ORM;
    };

    public static DatabaseType = (): DatabaseType => {
        return ConfigurationManager._config.Database.Type;
    };
}
