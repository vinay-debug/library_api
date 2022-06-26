import { UserDetailsDto } from "./user.dto";

export interface UserSearchFilters {
  
    Prefix: string;
    FirstName: string;
    MiddleName: string;
    LastName: string;
    Email: string;
    Password: string;
    RoleId:string;
    OrderBy: string;
    Order: string;
    PageIndex: number;
    ItemsPerPage: number;
}
export interface UserSearchResults {
    TotalCount: number;
    RetrievedCount: number;
    PageIndex: number;
    ItemsPerPage: number;
    Order: string;
    OrderedBy: string;
    Items: UserDetailsDto[];
}
