import { AbstractUserRepository } from "application/repositories/user.repository.abstract";
import { UseCaseInterface } from "application/useCases/usecase.interface";

import { UserEntity } from "domain/entities/user.entity";

export class FetchUserByIdUseCase implements UseCaseInterface {
	private userId: string;
	private repo: AbstractUserRepository;

	constructor(userId: string, repo: AbstractUserRepository) {
		this.userId = userId;
		this.repo = repo;
	}

	async execute(): Promise<UserEntity> {
		try {
			return await this.repo.fetchById(this.userId);
		} catch (err) {
			throw err;
		}
	}
}
