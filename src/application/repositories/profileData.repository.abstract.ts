import { ProfileDataEntity } from "domain/entities/profileData.entity";

export interface AbstractProfileDataRepository {
	updateDescription(profile: ProfileDataEntity): Promise<void>;
	createProfile(profile: ProfileDataEntity): Promise<ProfileDataEntity>;
	updateProfile(profile: ProfileDataEntity): Promise<void>;
	getById(id: string): Promise<ProfileDataEntity>;
}
