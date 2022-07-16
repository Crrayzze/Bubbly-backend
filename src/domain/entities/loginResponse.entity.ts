import { BaseEntity } from "domain/entities/base.entity";

export class LoginResponseEntity extends BaseEntity {
	message: string;
	token: string;

	constructor() {
		super();

		this.message = undefined;
		this.token = undefined;
	}
}
