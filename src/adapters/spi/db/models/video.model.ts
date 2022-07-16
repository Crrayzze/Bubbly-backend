import { Entity, Column, ObjectType, ManyToOne, JoinColumn } from "typeorm";

import { BaseModel } from "adapters/spi/db/models/base.model";
import { ProfileDataModel } from "adapters/spi/db/models/profileData.model";

@Entity({ name: "video" })
export class VideoModel extends BaseModel {
    
	@Column({ type: "timestamp" })
	PublishDate: Date;

	@Column({ length: 256 })
	Url: string;

	@ManyToOne((): ObjectType<ProfileDataModel> => ProfileDataModel, (profile: ProfileDataModel): VideoModel[] => profile.videos)
	@JoinColumn({ name: "user_id" })
	profile: ProfileDataModel;

}
