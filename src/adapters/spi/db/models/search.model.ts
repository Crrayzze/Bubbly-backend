import { Entity, Column, OneToOne, ObjectType, JoinColumn, OneToMany } from "typeorm";

import { BaseModel } from "adapters/spi/db/models/base.model";
import { ProfileDataModel } from "adapters/spi/db/models/profileData.model";

@Entity({ name: "search" })
export class SearchModel extends BaseModel {
	@Column({ length: 15 })
	search: string;

	@OneToMany((): ObjectType<ProfileDataModel> => ProfileDataModel, (profileData: ProfileDataModel): SearchModel => profileData.search)
	profileData: ProfileDataModel;
}
