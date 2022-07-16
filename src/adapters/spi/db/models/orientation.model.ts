import { Entity, Column, OneToOne, ObjectType, JoinColumn, OneToMany } from "typeorm";

import { BaseModel } from "adapters/spi/db/models/base.model";
import { ProfileDataModel } from "adapters/spi/db/models/profileData.model";

@Entity({ name: "orientation" })
export class OrientationModel extends BaseModel {
	@Column({ length: 255 })
	orientation: string;

	@OneToMany((): ObjectType<ProfileDataModel> => ProfileDataModel, (profileData: ProfileDataModel): OrientationModel => profileData.orientation)
	profileData: ProfileDataModel;
}
