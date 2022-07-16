import { BaseEntity } from "domain/entities/base.entity";

export class UserChangeEmailEntity extends BaseEntity {
	oldEmail: string;
	email: string;

	constructor() {
		super();

		this.oldEmail = undefined;
		this.email = undefined;
	}
}
