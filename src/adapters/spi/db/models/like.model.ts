import { Entity, ObjectType, ManyToOne, JoinColumn, Column } from "typeorm";

import { BaseModel } from "adapters/spi/db/models/base.model";
import { ProfileDataModel } from "adapters/spi/db/models/profileData.model";


@Entity({ name: "like" })
export class LikeModel extends BaseModel {

	@ManyToOne((): ObjectType<ProfileDataModel> => ProfileDataModel, (profile: ProfileDataModel): LikeModel[] => profile.likedFromMe, { eager: true })
	@JoinColumn({ name: "from_user_id" })
	from: ProfileDataModel;

	@ManyToOne((): ObjectType<ProfileDataModel> => ProfileDataModel, (profile: ProfileDataModel): LikeModel[] => profile.likedBy, { eager: true })
	@JoinColumn({ name: "to_user_id" })
	to: ProfileDataModel;

	@Column({ default: false })
	matched: boolean;
}
