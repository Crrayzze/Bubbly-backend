import { BaseEntity } from "domain/entities/base.entity";

export class UserChangePasswordEntity extends BaseEntity {
	email: string;
	password: string;

	constructor() {
		super();

		this.email = undefined;
		this.password = undefined;
	}
}
