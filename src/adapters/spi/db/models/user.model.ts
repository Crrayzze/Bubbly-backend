import { Entity, Column, OneToOne, ObjectType } from "typeorm";

import { BaseModel } from "adapters/spi/db/models/base.model";
import { ProfileDataModel } from "adapters/spi/db/models/profileData.model";

@Entity({ name: "user" })
export class UserModel extends BaseModel {
	@Column({ length: 255, unique: true })
	email: string;

	@Column({ length: 255 })
	password: string;

	@Column({ length: 4 })
	code: string;

	@Column({length: 20, nullable: true})
	token?: string;

	@Column({ default: false })
	confirmed: boolean;

	@OneToOne((): ObjectType<ProfileDataModel> => ProfileDataModel, (data: ProfileDataModel): UserModel => data.user, { eager: true })
	data: ProfileDataModel;

}
