import { BaseEntity } from "domain/entities/base.entity";
import { TagEntity } from "domain/entities/tag.entity";

import { ProfileDataEntity } from "domain/entities/profileData.entity";

export class UsersTagEntity extends BaseEntity {
    userProfile: ProfileDataEntity;
    tag: TagEntity;

    constructor() {
        super();

        this.tag = undefined;
        this.userProfile = undefined;
    }
}