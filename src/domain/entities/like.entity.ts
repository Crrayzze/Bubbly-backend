import { BaseEntity } from "domain/entities/base.entity";

import { ProfileDataEntity } from "./profileData.entity";

export class LikeEntity extends BaseEntity {
	from: ProfileDataEntity;
	to: ProfileDataEntity;
	matched: boolean;

	constructor() {
		super();

		this.from = undefined;
		this.to = undefined;
		this.matched = false;
	}
}
