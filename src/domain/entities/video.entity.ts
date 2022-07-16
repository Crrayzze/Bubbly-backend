import { BaseEntity } from "domain/entities/base.entity";
import { ProfileDataEntity } from "./profileData.entity";

export class VideoEntity extends BaseEntity {
	publishDate: Date;
	url: string;
	profile: ProfileDataEntity;

	constructor() {
		super();

		this.publishDate = undefined;
		this.url = undefined;
		this.profile = undefined;
	}
}
