import { BaseEntity } from "domain/entities/base.entity";

export class GenreEntity extends BaseEntity {
	genre: string;

	constructor() {
		super();

		this.genre = undefined;
	}
}
