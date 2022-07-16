import { UseCaseInterface } from "application/useCases/usecase.interface";
import { AbstractLikerepository } from "application/repositories/like.repository.abstract";

import { ProfileDataEntity } from "domain/entities/profileData.entity";
import { LikeEntity } from "domain/entities/like.entity";

export class CreateLikeUseCase implements UseCaseInterface {
	private repo: AbstractLikerepository;
	private from: ProfileDataEntity;
	private to: ProfileDataEntity;

	constructor(from: ProfileDataEntity, to: ProfileDataEntity, repo: AbstractLikerepository) {
		this.repo = repo;
		this.from = from;
		this.to = to;
	}

	async execute(): Promise<LikeEntity> {
		try {
			const likeEntity: LikeEntity = new LikeEntity();
			likeEntity.from = this.from;
			likeEntity.to = this.to;

			return await this.repo.create(likeEntity);
		} catch (err) {
			throw err;
		}
	}
}
