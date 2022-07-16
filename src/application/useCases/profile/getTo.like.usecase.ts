import { UseCaseInterface } from "application/useCases/usecase.interface";
import { AbstractLikerepository } from "application/repositories/like.repository.abstract";

import { LikeEntity } from "domain/entities/like.entity";
import { ProfileDataEntity } from "domain/entities/profileData.entity";

export class GetLikeToUseCase implements UseCaseInterface {
	private repo: AbstractLikerepository;
	private user: ProfileDataEntity;

	constructor(repo: AbstractLikerepository, user: ProfileDataEntity) {
		this.repo = repo;
		this.user = user;
	}

	async execute(): Promise<LikeEntity[]> {
		try {
			return await this.repo.getTo(this.user);
		} catch (err) {
			throw err;
		}
	}
}
