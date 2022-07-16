import { UseCaseInterface } from "application/useCases/usecase.interface";
import { VideoEntity } from "domain/entities/video.entity";

import { AbstractVideoRepository } from "application/repositories/video.repository.abstract";
import { ProfileDataEntity } from "domain/entities/profileData.entity";
import { ProfileDataMapper } from "adapters/spi/db/mappers/profileData.mapper";

export class GetVideoByprofileUseCase implements UseCaseInterface {
	private profile: ProfileDataEntity;
	private repo: AbstractVideoRepository;

	constructor(repo: AbstractVideoRepository, profile: ProfileDataEntity) {
		this.repo = repo;
		this.profile = profile;
	}

	async execute(): Promise<VideoEntity[]> {
		try {
			const profileDataMapper: ProfileDataMapper = new ProfileDataMapper();
			return await this.repo.getByProfile(profileDataMapper.toModel(this.profile));
		} catch (err) {
			throw err;
		}
	}
}
