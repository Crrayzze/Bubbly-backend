import { AbstractAuthenticationRepository } from "application/repositories/authentication.repository.abstract";
import { UseCaseInterface } from "application/useCases/usecase.interface";

import { UserEntity } from "domain/entities/user.entity";
import { LoginResponseEntity } from "domain/entities/loginResponse.entity";

export class LoginUserUseCase implements UseCaseInterface {
	private user: UserEntity;
	private repo: AbstractAuthenticationRepository;

	constructor(user: UserEntity, repo: AbstractAuthenticationRepository) {
		this.user = user;
		this.repo = repo;
	}

	async execute(): Promise<LoginResponseEntity> {
		try {
			const token: string = await this.repo.login(this.user);
			const response: LoginResponseEntity = {
				message: "User logged in",
				token
			};
            
			return response;
		} catch (err) {
			throw err;
		}
	}
}
