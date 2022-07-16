import { UseCaseInterface } from "application/useCases/usecase.interface";
import { ProfileDataEntity } from "domain/entities/profileData.entity";
import { AbstractProfileDataRepository } from "application/repositories/profileData.repository.abstract";
import { UsersTagEntity } from "domain/entities/usersTag.entity";
import { ProfileDataMapper } from "adapters/spi/db/mappers/profileData.mapper";
import { ProfileVideoEntity } from "domain/entities/profileVideo.entity";
import { VideoEntity } from "domain/entities/video.entity";
import { AbstractVideoRepository } from "application/repositories/video.repository.abstract";
import { AbstractUsersTagRepository } from "application/repositories/usersTag.repository.abstract";

export class GetEntireProfileByIdUseCase implements UseCaseInterface {
	private id: string;
	private repoProfile: AbstractProfileDataRepository;
	private repoTag: AbstractUsersTagRepository;
	private repoVideo: AbstractVideoRepository;

	constructor(id: string, repoProfile: AbstractProfileDataRepository, repoTag: AbstractUsersTagRepository, repoVideo: AbstractVideoRepository) {
		this.id = id;
		this.repoProfile = repoProfile;
		this.repoTag = repoTag;
		this.repoVideo = repoVideo;
	}

	async execute(): Promise<ProfileDataEntity> {
		try {
			const profileDataMapper: ProfileDataMapper = new ProfileDataMapper();
			const profileBuffer: ProfileDataEntity = await this.repoProfile.getById(this.id);

			const profileToReturn: ProfileDataEntity = profileBuffer;

			// Get the tags
			const usersTagEntities: UsersTagEntity[] = await this.repoTag.getById(profileDataMapper.toModel(profileBuffer));
			profileToReturn.tags = [];
			for (const tag of usersTagEntities) {
				profileToReturn.tags.push(tag.tag);
			}

			// Get the videos
			const videoEntities: VideoEntity[] = await this.repoVideo.getByProfile(profileDataMapper.toModel(profileBuffer));
			profileToReturn.videos = [];
			for (const video of videoEntities) {
				const newProfileVideoEntity: ProfileVideoEntity = {
					id: video.id,
					publishDate: video.publishDate,
					url: video.url,
					updateData: video.updateData
				};
				profileToReturn.videos.push(newProfileVideoEntity);
			}

			return profileToReturn;
			
		} catch (err) {
			throw err;
		}
	}
}
