import { Entity, Column, OneToOne, ObjectType, JoinColumn, OneToMany, Double } from "typeorm";

import { BaseModel } from "adapters/spi/db/models/base.model";
import { ProfileDataModel } from "adapters/spi/db/models/profileData.model";

@Entity({ name: "preference" })
export class PreferenceModel extends BaseModel {
	@Column({ nullable:true })
	age_minimum: number;

	@Column({ nullable:true })
    age_maximum: number;

	@OneToMany((): ObjectType<ProfileDataModel> => ProfileDataModel, (profileData: ProfileDataModel): PreferenceModel => profileData.preference)
	profileData: ProfileDataModel;
}
