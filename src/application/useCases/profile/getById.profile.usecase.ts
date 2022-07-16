import { AbstractProfileDataRepository } from "application/repositories/profileData.repository.abstract";
import { UseCaseInterface } from "application/useCases/usecase.interface";

import { ProfileDataEntity } from "domain/entities/profileData.entity";

export class GetProfileByIdUseCase implements UseCaseInterface {
	private repo: AbstractProfileDataRepository;
	private id: string;

	constructor(repo: AbstractProfileDataRepository, id: string) {
		this.repo = repo;
		this.id = id;
	}

	async execute(): Promise<ProfileDataEntity> {
		try {
			return await this.repo.getById(this.id);
		} catch (err) {
			throw err;
		}
	}
}
