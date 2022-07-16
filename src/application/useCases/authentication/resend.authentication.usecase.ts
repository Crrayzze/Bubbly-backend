import { AbstractSendMailRepository } from "application/repositories/sendMail.repository.abstract";
import { UseCaseInterface } from "application/useCases/usecase.interface";

import { UserEntity } from "domain/entities/user.entity";
import { GenericResponseEntity } from "domain/entities/genericResponse.entity";

export class ResendUserUseCase implements UseCaseInterface {
	private user: UserEntity;
	// private repo: AbstractAuthenticationRepository;
	private sendMaildRepo: AbstractSendMailRepository;

	constructor(user: UserEntity, /*repo: AbstractAuthenticationRepository,*/ sendMailRepo: AbstractSendMailRepository) {
		this.user = user;
		// this.repo = repo;
		this.sendMaildRepo = sendMailRepo;
	}

	async execute(): Promise<GenericResponseEntity> {
		try {

			const response: GenericResponseEntity = {
				message: "Email send"
			};

			await this.sendMaildRepo.sendMail({
				email: this.user.email,
				subject: "Bienvenue chez Bubbly",
				content: {
					title: "Bienvenue chez Bubbly",
					text: "Voici le code pour vérifier votre email : " + this.user.code + " ! "
				}
			});

			return response;
		} catch (err) {
			throw err;
		}
	}
}
