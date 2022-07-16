import { UseCaseInterface } from "application/useCases/usecase.interface";
import { ProfileDataEntity } from "domain/entities/profileData.entity";
import { AbstractProfileDataRepository } from "application/repositories/profileData.repository.abstract";

export class UpdateProfileUseCase implements UseCaseInterface {
	private profile: ProfileDataEntity;
	private repo: AbstractProfileDataRepository;

	constructor(profile: ProfileDataEntity, repo: AbstractProfileDataRepository) {
		this.profile = profile;
		this.repo = repo;
	}

	async execute(): Promise<void> {
		try {
			await this.repo.updateProfile(this.profile);
		} catch (err) {
			throw err;
		}
	}
}
