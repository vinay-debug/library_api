import { AuthorDetailsDto } from "domain.types/author/author.dto";
import Author from "../models/author.model";

export class AuthorMapper {
    
    static toDetailsDto = async (entity:Author): Promise<AuthorDetailsDto> => {
        if (entity === null) {
            return null;
        }
        const dto: AuthorDetailsDto = {
            id :entity.id,
            FirstName: entity.FirstName,
            LastName: entity. LastName,
            CreatedAt: entity.createdAt,
            UpdatedAt: entity.updatedAt
        };

        return dto;
    };
}
