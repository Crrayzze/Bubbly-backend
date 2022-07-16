import { UseCaseInterface } from "application/useCases/usecase.interface";
import { AbstractUsersTagRepository } from "application/repositories/usersTag.repository.abstract";

import { ProfileDataEntity } from "domain/entities/profileData.entity";
import { TagEntity } from "domain/entities/tag.entity";
import { UsersTagEntity } from "domain/entities/usersTag.entity";

export class GetTagByUserIdUseCase implements UseCaseInterface {
	private repo: AbstractUsersTagRepository;
	private profile: ProfileDataEntity;
	private tag: TagEntity;

	constructor(profile: ProfileDataEntity, tag: TagEntity, repo: AbstractUsersTagRepository) {
		this.repo = repo;
		this.profile = profile;
		this.tag = tag;
	}

	async execute(): Promise<void> {
		try {
			const userTagEntity: UsersTagEntity = new UsersTagEntity();
			userTagEntity.tag = this.tag;
			userTagEntity.userProfile = this.profile;

			await this.repo.create(userTagEntity);
		} catch (err) {
			throw err;
		}
	}
}
