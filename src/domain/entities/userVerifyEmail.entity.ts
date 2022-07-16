import { BaseEntity } from "domain/entities/base.entity";

export class UserVerifyEmailEntity extends BaseEntity {
	email: string;
	code: string;

	constructor() {
		super();

		this.email = undefined;
		this.code = undefined;
	}
}
