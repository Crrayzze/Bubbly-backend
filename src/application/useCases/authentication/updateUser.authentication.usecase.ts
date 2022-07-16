import { AbstractAuthenticationRepository } from "application/repositories/authentication.repository.abstract";
import { AbstractSendMailRepository } from "application/repositories/sendMail.repository.abstract";
import { UseCaseInterface } from "application/useCases/usecase.interface";

import { UserEntity } from "domain/entities/user.entity";
import { GenericResponseEntity } from "domain/entities/genericResponse.entity";

export class UpdateUserUseCase implements UseCaseInterface {
	private user: UserEntity;
	private repo: AbstractAuthenticationRepository;
	private sendMaildRepo: AbstractSendMailRepository;

	constructor(user: UserEntity, repo: AbstractAuthenticationRepository, sendMailRepo: AbstractSendMailRepository) {
		this.user = user;
		this.repo = repo;
		this.sendMaildRepo = sendMailRepo;
	}

	async execute(): Promise<GenericResponseEntity> {
		try {
			await this.repo.updateAccount(this.user);

			const response: GenericResponseEntity = {
				message: "User updated"
			};

			await this.sendMaildRepo.sendMail({
				email: this.user.email,
				subject: "Compte mis à jour",
				content: {
					title: "Compte mis à jour",
					text: "Compte mis à jour"
				}
			});

			return (response);
		} catch (err) {
			throw err;
		}
	}
}
