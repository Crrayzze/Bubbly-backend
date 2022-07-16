import { BaseEntity } from "domain/entities/base.entity";

export class UserRecoveryPwdSendCodeEntity extends BaseEntity {
	email: string;

	constructor() {
		super();

		this.email = undefined;
	}
}
