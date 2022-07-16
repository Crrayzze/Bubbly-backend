import { UseCaseInterface } from "application/useCases/usecase.interface";
import { AbstractLikerepository } from "application/repositories/like.repository.abstract";

import { LikeEntity } from "domain/entities/like.entity";

export class SaveLikeUseCase implements UseCaseInterface {
	private repo: AbstractLikerepository;
	private like: LikeEntity;

	constructor(repo: AbstractLikerepository, like: LikeEntity) {
		this.repo = repo;
		this.like = like;
	}

	async execute(): Promise<LikeEntity> {
		try {
			return await this.repo.create(this.like);
		} catch (err) {
			throw err;
		}
	}
}
