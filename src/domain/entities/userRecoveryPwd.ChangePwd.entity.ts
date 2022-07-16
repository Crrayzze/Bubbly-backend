import { BaseEntity } from "domain/entities/base.entity";

export class UserRecoveryPwdChangePwdEntity extends BaseEntity {
	email: string;
	code: string;
	password: string;

	constructor() {
		super();

		this.email = undefined;
		this.code = undefined;
		this.password = undefined;
	}
}
