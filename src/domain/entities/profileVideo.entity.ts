import { BaseEntity } from "domain/entities/base.entity";

export class ProfileVideoEntity extends BaseEntity {
	publishDate: Date;
	url: string;

	constructor() {
		super();

		this.publishDate = undefined;
		this.url = undefined;
	}
}
