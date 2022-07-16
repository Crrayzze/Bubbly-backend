import { LikeEntity } from "domain/entities/like.entity";
import { ProfileDataEntity } from "domain/entities/profileData.entity";

export interface AbstractLikerepository {
	create(like: LikeEntity): Promise<LikeEntity>;
	getByUsersIds(like: LikeEntity): Promise<LikeEntity>;
	getTo(user: ProfileDataEntity): Promise<LikeEntity[]>;
	getMatch(user: ProfileDataEntity): Promise<LikeEntity[]>;
}
