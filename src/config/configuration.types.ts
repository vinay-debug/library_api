export type AuthorizationType = 'Custom'; //TBD: Other options need to be supported
export type AuthenticationType = 'Custom'; //TBD: Other options need to be supported
export interface Configurations {
    SystemIdentifier: string;
    BaseUrl: string;
    MaxUploadFileSize: number;
    Auth: AuthConfig;
}
export interface AuthConfig {
    Authentication: AuthenticationType;
    Authorization: AuthorizationType;
}
