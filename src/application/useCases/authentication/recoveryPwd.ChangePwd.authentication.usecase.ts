import { AbstractAuthenticationRepository } from "application/repositories/authentication.repository.abstract";
import { AbstractSendMailRepository } from "application/repositories/sendMail.repository.abstract";
import { UseCaseInterface } from "application/useCases/usecase.interface";

import { GenericError } from "domain/errors/generic.error.entity";

import { UserEntity } from "domain/entities/user.entity";
import { GenericResponseEntity } from "domain/entities/genericResponse.entity";

import { createCode } from "adapters/spi/shared/utils/createCode";

export class RecoveryPwdChangePwdUserUseCase implements UseCaseInterface {
	private repo: AbstractAuthenticationRepository;
	private sendMaildRepo: AbstractSendMailRepository;
	private email: string;
	private code: string;
	private password: string;

	constructor(repo: AbstractAuthenticationRepository, sendMailRepo: AbstractSendMailRepository, email: string, code: string, password: string) {
		this.repo = repo;
		this.sendMaildRepo = sendMailRepo;
		this.email = email;
		this.code = code;
		this.password = password;
	}

	async execute(): Promise<GenericResponseEntity> {
		try {

			const userData: UserEntity = await this.repo.getAccountByEmail(this.email);

			if (userData.code !== this.code) {
				throw new GenericError("Invalid code!", 400);
			}

			userData.code = createCode();
			userData.password = this.password;
			await this.repo.updateAccount(userData);

			const response: GenericResponseEntity = {
				message: "Password changed"
			};

			await this.sendMaildRepo.sendMail({
				email: this.email,
				subject: "Compte mis à jour",
				content: {
					title: "Compte mis à jour",
					text: "Votre mot de passe à été mis à jour !"
				}
			});
			return (response);
		} catch (err) {
			throw (err);
		}
	}
}
