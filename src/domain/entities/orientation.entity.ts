import { BaseEntity } from "domain/entities/base.entity";

export class OrientationEntity extends BaseEntity {
	orientation: string;

	constructor() {
		super();

		this.orientation = undefined;
	}
}
