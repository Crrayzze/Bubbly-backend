import { BaseEntity } from "domain/entities/base.entity";
import { ProfileDataEntity } from "domain/entities/profileData.entity";

export class UserEntity extends BaseEntity {
	email: string;
	confirmed: boolean;
	password: string;
	code: string;
	token?: string;
	profileData: ProfileDataEntity;

	constructor() {
		super();

		this.email = undefined;
		this.confirmed = false;
		this.password = undefined;
		this.code = undefined;
		this.token = undefined;
		this.profileData = new ProfileDataEntity();
	}
}
