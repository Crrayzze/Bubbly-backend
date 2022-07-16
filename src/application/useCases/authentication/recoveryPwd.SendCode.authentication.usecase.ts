import { AbstractAuthenticationRepository } from "application/repositories/authentication.repository.abstract";
import { AbstractSendMailRepository } from "application/repositories/sendMail.repository.abstract";
import { UseCaseInterface } from "application/useCases/usecase.interface";

import { UserEntity } from "domain/entities/user.entity";
import { GenericResponseEntity } from "domain/entities/genericResponse.entity";

import { createCode } from "adapters/spi/shared/utils/createCode";

export class RecoveryPwdSendCodeUserUseCase implements UseCaseInterface {
	private repo: AbstractAuthenticationRepository;
	private sendMaildRepo: AbstractSendMailRepository;
	private email: string;

	constructor(repo: AbstractAuthenticationRepository, sendMailRepo: AbstractSendMailRepository, email: string) {
		this.repo = repo;
		this.sendMaildRepo = sendMailRepo;
		this.email = email;
	}

	async execute(): Promise<GenericResponseEntity> {
		try {

			const userData: UserEntity = await this.repo.getAccountByEmail(this.email);

			userData.code = createCode();
			await this.repo.updateAccount(userData);

			const response: GenericResponseEntity = {
				message: "Recovery Code generated"
			};

			await this.sendMaildRepo.sendMail({
				email: this.email,
				subject: "Code pour la récupération de mot de passe",
				content: {
					title: "Code pour la récupération de mot de passe",
					text: "Votre code pour la récupération de votre mot de passe est : " + userData.code + " !"
				}
			});
			return (response);
		} catch (err) {
			throw (err);
		}
	}
}
