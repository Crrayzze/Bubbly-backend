import { BaseEntity } from "domain/entities/base.entity";

export class PreferenceEntity extends BaseEntity {
	age_minimum: number;
    age_maximum: number;

	constructor() {
		super();

		this.age_minimum = undefined;
        this.age_maximum = undefined;
	}
}
