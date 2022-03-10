export type AuthorizationType = 'Custom'; //TBD: Other options need to be supported
export type AuthenticationType = 'Custom'; //TBD: Other options need to be supported
export type DatabaseType = 'SQL' | 'NoSQL';
export type DatabaseORM = 'Sequelize' | 'Knex' | 'Mongoose';
export type DatabaseFlavour = 'MySQL' | 'PostGreSQL' | 'MongoDB';

export interface Configurations {
    SystemIdentifier: string;
    BaseUrl: string;
    Database : DatabaseConfig;
    MaxUploadFileSize: number;
    Auth: AuthConfig;
}
export interface AuthConfig {
    Authentication: AuthenticationType;
    Authorization: AuthorizationType;
}

export interface DatabaseConfig {
    Type   : DatabaseType;
    ORM    : DatabaseORM;
    Flavour: DatabaseFlavour;
}
