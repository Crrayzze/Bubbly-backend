import { ProfileDataMapper } from "adapters/spi/db/mappers/profileData.mapper";
import { AbstractAuthenticationRepository } from "application/repositories/authentication.repository.abstract";
import { AbstractUsersTagRepository } from "application/repositories/usersTag.repository.abstract";
import { AbstractVideoRepository } from "application/repositories/video.repository.abstract";
import { UseCaseInterface } from "application/useCases/usecase.interface";
import { ProfileDataEntity } from "domain/entities/profileData.entity";
import { ProfileVideoEntity } from "domain/entities/profileVideo.entity";

import { UserEntity } from "domain/entities/user.entity";
import { UsersTagEntity } from "domain/entities/usersTag.entity";
import { VideoEntity } from "domain/entities/video.entity";

export class AuthenticateUserTokenUseCase implements UseCaseInterface {
	private token: string;
	private repo: AbstractAuthenticationRepository;
	private repoTag: AbstractUsersTagRepository;
	private repoVideo: AbstractVideoRepository;

	constructor(token: string, repo: AbstractAuthenticationRepository, repoTag: AbstractUsersTagRepository, repoVideo: AbstractVideoRepository) {
		this.token = token;
		this.repo = repo;
		this.repoTag = repoTag;
		this.repoVideo = repoVideo;
	}

	async execute(): Promise<UserEntity> {
		try {
			const userEntity: UserEntity = await this.repo.middleware(this.token);
			const profileDataMapper: ProfileDataMapper = new ProfileDataMapper();
			if (userEntity.profileData) {
				const profilerBuffer: ProfileDataEntity = userEntity.profileData;

				// Get the tags
				const usersTagEntities: UsersTagEntity[] = await this.repoTag.getById(profileDataMapper.toModel(userEntity.profileData));
				userEntity.profileData.tags = [];
				for (const tag of usersTagEntities) {
					userEntity.profileData.tags.push(tag.tag);
				}

				// Get the videos
				const videoEntities: VideoEntity[] = await this.repoVideo.getByProfile(profileDataMapper.toModel(profilerBuffer));

				userEntity.profileData.videos = [];
				for (const video of videoEntities) {
					const newProfileVideoEntity: ProfileVideoEntity = {
						id: video.id,
						publishDate: video.publishDate,
						url: video.url,
						updateData: video.updateData
					};
					userEntity.profileData.videos.push(newProfileVideoEntity);
				}
			}
			return userEntity;

		} catch (err) {
			throw err;
		}
	}
}
