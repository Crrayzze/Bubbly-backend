import { UseCaseInterface } from "application/useCases/usecase.interface";
import { AbstractLikerepository } from "application/repositories/like.repository.abstract";

import { ProfileDataEntity } from "domain/entities/profileData.entity";
import { LikeEntity } from "domain/entities/like.entity";

export class GetLikeByUserIdUseCase implements UseCaseInterface {
	private repo: AbstractLikerepository;
	private userTo: ProfileDataEntity;
	private userFrom: ProfileDataEntity;

	constructor(repo: AbstractLikerepository, userTo: ProfileDataEntity, userFrom: ProfileDataEntity) {
		this.repo = repo;
		this.userTo = userTo;
		this.userFrom = userFrom;
	}

	async execute(): Promise<LikeEntity> {
		try {
			const likeEntity: LikeEntity = new LikeEntity();
			likeEntity.from = this.userFrom;
			likeEntity.to = this.userTo;

			return await this.repo.getByUsersIds(likeEntity);
		} catch (err) {
			throw err;
		}
	}
}
