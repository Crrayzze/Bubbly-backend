import { ProfileDataModel } from "adapters/spi/db/models/profileData.model";
import { UsersTagEntity } from "domain/entities/usersTag.entity";

export interface AbstractUsersTagRepository {
    delete(id: string): Promise<void>;
    create(userTagEntity: UsersTagEntity): Promise<void>;
    getById(profile: ProfileDataModel): Promise<UsersTagEntity[]>;
}