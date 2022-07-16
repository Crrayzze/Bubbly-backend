import { AbstractAuthenticationRepository } from "application/repositories/authentication.repository.abstract";
import { UseCaseInterface } from "application/useCases/usecase.interface";

import { UserEntity } from "domain/entities/user.entity";

export class GetUserByEmailUseCase implements UseCaseInterface {
	private email: string;
	private repo: AbstractAuthenticationRepository;

	constructor(email: string, repo: AbstractAuthenticationRepository) {
		this.email = email;
		this.repo = repo;
	}

	async execute(): Promise<UserEntity> {
		try {
			return (await this.repo.getAccountByEmail(this.email));
		} catch (err) {
			throw err;
		}
	}
}
