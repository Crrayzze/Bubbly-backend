import { BaseEntity } from "domain/entities/base.entity";

export class SearchEntity extends BaseEntity {
	search: string;

	constructor() {
		super();

		this.search = undefined;
	}
}
