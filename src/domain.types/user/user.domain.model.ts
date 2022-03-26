export interface UserDomainModel {
    Prefix: string;
    FirstName: string;
    MiddleName: string;
    LastName: string;
    Email: string;
    Password: string;
    RoleId: string;
}

export interface UserLoginDetails {
    Email: string;
    Password: string;
}
