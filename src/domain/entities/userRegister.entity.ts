import { BaseEntity } from "domain/entities/base.entity";

export class UserRegisterEntity extends BaseEntity {
	email: string;
	password: string;

	constructor() {
		super();

		this.email = undefined;
		this.password = undefined;
	}
}
