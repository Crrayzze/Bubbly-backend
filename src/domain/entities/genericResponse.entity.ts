import { BaseEntity } from "domain/entities/base.entity";

export class GenericResponseEntity extends BaseEntity {
	message: string;

	constructor(message: string) {
		super();

		this.message = message;
	}
}
