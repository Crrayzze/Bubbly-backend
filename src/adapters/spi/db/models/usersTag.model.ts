import { Entity, Column, ObjectType, ManyToOne, JoinColumn } from "typeorm";

import { BaseModel } from "adapters/spi/db/models/base.model";
import { ProfileDataModel } from "adapters/spi/db/models/profileData.model";
import { TagModel } from "adapters/spi/db/models/tag.model";


@Entity({ name: "usersTag" })
export class UsersTagModel extends BaseModel {

	@ManyToOne((): ObjectType<ProfileDataModel> => ProfileDataModel, (profile: ProfileDataModel): UsersTagModel[] => profile.tags)
	@JoinColumn({ name: "user_id" })
	userProfile: ProfileDataModel;

	@ManyToOne((): ObjectType<TagModel> => TagModel, (tag: TagModel): UsersTagModel[] => tag.profiles, {eager: true})
	@JoinColumn({ name: "tag_id" })
	tag: TagModel;

}
