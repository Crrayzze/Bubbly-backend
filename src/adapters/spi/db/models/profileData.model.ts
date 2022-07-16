import { Entity, Column, OneToOne, ObjectType, JoinColumn, OneToMany, ManyToOne } from "typeorm";

import { BaseModel } from "adapters/spi/db/models/base.model";
import { UserModel } from "adapters/spi/db/models/user.model";
import { UsersTagModel } from "adapters/spi/db/models/usersTag.model";
import { OrientationModel } from "adapters/spi/db/models/orientation.model";
import { PreferenceModel } from "adapters/spi/db/models/preference.model";
import { SearchModel } from "adapters/spi/db/models/search.model";
import { LikeModel } from "adapters/spi/db/models/like.model";
import { GenreModel } from "adapters/spi/db/models/genre.model";
import { VideoModel } from "./video.model";

@Entity({ name: "profileData" })
export class ProfileDataModel extends BaseModel {
	@Column({ length: 255 })
	firstName: string;

	@Column({ length: 255 })
	lastName: string;

	@Column({ name: "phone_number", length: 20 })
	phoneNbr: string;

	@Column({ length: 11, nullable: false })
	birthday: string;

	@Column({ length: 500, nullable: true })
	description: string;

	@OneToOne((): ObjectType<UserModel> => UserModel, (user: UserModel): ProfileDataModel => user.data)
	@JoinColumn({name: "user_id"})
	user: UserModel;

	@OneToMany((): ObjectType<UsersTagModel> => UsersTagModel, (tag: UsersTagModel): ProfileDataModel => tag.userProfile)
	tags: UsersTagModel[];

	@ManyToOne((): ObjectType<OrientationModel> => OrientationModel, (orientation: OrientationModel): ProfileDataModel => orientation.profileData, {eager: true})
	@JoinColumn({name: "orientation_id"})
	orientation: OrientationModel;

	@ManyToOne((): ObjectType<PreferenceModel> => PreferenceModel, (orientation: PreferenceModel): ProfileDataModel => orientation.profileData, {eager: true})
	@JoinColumn({name: "preference_id"})
	preference: PreferenceModel;

	@ManyToOne((): ObjectType<SearchModel> => SearchModel, (search: SearchModel): ProfileDataModel => search.profileData, {eager: true})
	@JoinColumn({name: "search_id"})
	search: SearchModel;

	@ManyToOne((): ObjectType<GenreModel> => GenreModel, (genre: GenreModel): ProfileDataModel => genre.profileData, {eager: true})
	@JoinColumn({name: "genre_id"})
	genre: GenreModel;

	@OneToMany((): ObjectType<LikeModel> => UsersTagModel, (like: LikeModel): ProfileDataModel => like.from)
	likedFromMe: LikeModel[];

	@OneToMany((): ObjectType<LikeModel> => UsersTagModel, (like: LikeModel): ProfileDataModel => like.to)
	likedBy: LikeModel[];

	@OneToMany((): ObjectType<VideoModel> => UsersTagModel, (video: VideoModel): ProfileDataModel => video.profile)
	videos: VideoModel[];

}
