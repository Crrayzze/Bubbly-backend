import { BaseEntity } from "domain/entities/base.entity";
import { OrientationEntity } from "domain/entities/orientation.entity";
import { SearchEntity } from "domain/entities/search.entity";

import { GenreEntity } from "./genre.entity";
import { PreferenceEntity } from "./preference.entity";
import { ProfileVideoEntity } from "./profileVideo.entity";
import { TagEntity } from "./tag.entity";

export class ProfileDataEntity extends BaseEntity {
	firstName: string;
	lastName: string;
	phoneNbr: string;
	birthday: string;
	description: string;
	tags: TagEntity[];
	orientation: OrientationEntity;
	genre: GenreEntity;
	search: SearchEntity;
	preference: PreferenceEntity;
	videos: ProfileVideoEntity[];

	constructor() {
		super();

		this.firstName = undefined;
		this.lastName = undefined;
		this.phoneNbr = undefined;
		this.birthday = undefined;
		this.description = undefined;
		this.tags = [];
		this.orientation = undefined;
		this.genre = undefined;
		this.search = undefined;
		this.preference = undefined;
		this.videos = [];
	}
}
