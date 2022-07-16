import { ProfileDataModel } from "adapters/spi/db/models/profileData.model";
import { VideoEntity } from "domain/entities/video.entity";

export interface AbstractVideoRepository {
	postVideo(video: VideoEntity): Promise<void>;
	getByProfile(profile: ProfileDataModel): Promise<VideoEntity[]>;
}
