import { UseCaseInterface } from "application/useCases/usecase.interface";
import { GenericResponseEntity } from "domain/entities/genericResponse.entity";
import { ProfileDataEntity } from "domain/entities/profileData.entity";
import { AbstractProfileDataRepository } from "application/repositories/profileData.repository.abstract";

export class UpdateDescriptionProfileUseCase implements UseCaseInterface {
	private profile: ProfileDataEntity;
	private repo: AbstractProfileDataRepository;

	constructor(profile: ProfileDataEntity, repo: AbstractProfileDataRepository) {
		this.profile = profile;
		this.repo = repo;
	}

	async execute(): Promise<GenericResponseEntity> {
		try {
			await this.repo.updateDescription(this.profile);
			return new GenericResponseEntity("Description updated");
		} catch (err) {
			throw err;
		}
	}
}
