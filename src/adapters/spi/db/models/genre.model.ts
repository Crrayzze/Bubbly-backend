import { Entity, Column, ObjectType, OneToMany } from "typeorm";

import { BaseModel } from "adapters/spi/db/models/base.model";
import { ProfileDataModel } from "adapters/spi/db/models/profileData.model";

@Entity({ name: "genre" })
export class GenreModel extends BaseModel {
	@Column({ length: 255, nullable: true })
	name: string;

	@OneToMany((): ObjectType<ProfileDataModel> => ProfileDataModel, (profileData: ProfileDataModel): GenreModel => profileData.genre)
	profileData: ProfileDataModel;
}
