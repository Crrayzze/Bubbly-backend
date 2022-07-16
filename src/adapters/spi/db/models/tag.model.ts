import { Entity, Column, OneToMany, ObjectType } from "typeorm";

import { BaseModel } from "adapters/spi/db/models/base.model";
import { UsersTagModel } from "adapters/spi/db/models/usersTag.model";

@Entity({ name: "tag" })
export class TagModel extends BaseModel {

	@Column({ length: 255 })
	name: string;

	@OneToMany((): ObjectType<UsersTagModel> => UsersTagModel, (profile: UsersTagModel): TagModel => profile.tag)
	profiles: UsersTagModel[];

}
