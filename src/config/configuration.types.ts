export type AuthorizationType = 'Custom'; //TBD: Other options need to be supported
export type AuthenticationType = 'Custom'; //TBD: Other options need to be supported

export type DatabaseFlavour = 'MySQL' | 'PostGreSQL' | 'MongoDB';
export type DatabaseType = 'SQL' | 'NoSQL';
export type DatabaseORM = 'Sequelize' | 'Knex' | 'Mongoose';

export interface DatabaseConfig {
    Type: DatabaseType;
    ORM: DatabaseORM;
    Flavour: DatabaseFlavour;
}

export interface Configurations {
    SystemIdentifier: string;
    BaseUrl: string;
    MaxUploadFileSize: number;
    Auth: AuthConfig;
    Database: DatabaseConfig;
}
export interface AuthConfig {
    Authentication: AuthenticationType;
    Authorization: AuthorizationType;
}
