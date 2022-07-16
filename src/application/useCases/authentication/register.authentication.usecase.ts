import { AbstractAuthenticationRepository } from "application/repositories/authentication.repository.abstract";
import { AbstractSendMailRepository } from "application/repositories/sendMail.repository.abstract";
import { UseCaseInterface } from "application/useCases/usecase.interface";

import { UserEntity } from "domain/entities/user.entity";
import { ProfileDataEntity } from "domain/entities/profileData.entity";
import { GenericResponseEntity } from "domain/entities/genericResponse.entity";
import { GenericError } from "domain/errors/generic.error.entity";
import { AbstractProfileDataRepository } from "application/repositories/profileData.repository.abstract";
import { PreferenceEntity } from "domain/entities/preference.entity";
import { AbstractPreferenceRepository } from "application/repositories/preference.repository.abstract";

export class RegisterUserUseCase implements UseCaseInterface {
	private user: UserEntity;
	private repo: AbstractAuthenticationRepository;
	private sendMaildRepo: AbstractSendMailRepository;
	private profileDataRepo: AbstractProfileDataRepository;
	private birthday: string;
	private preferenceRepo: AbstractPreferenceRepository;

	constructor(user: UserEntity,
		repo: AbstractAuthenticationRepository,
		sendMailRepo: AbstractSendMailRepository,
		profileDataRepository: AbstractProfileDataRepository,
		birthday: string,
		preferenceRepo: AbstractPreferenceRepository) {
		this.user = user;
		this.repo = repo;
		this.profileDataRepo = profileDataRepository;
		this.sendMaildRepo = sendMailRepo;
		this.birthday = birthday;
		this.preferenceRepo = preferenceRepo;
	}

	async execute(): Promise<GenericResponseEntity> {
		try {

			const today: Date = new Date();
			const birthDate: Date = new Date(this.birthday);
			let age: number = today.getFullYear() - birthDate.getFullYear();
			const m: number = today.getMonth() - birthDate.getMonth();
			if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
				age--;
			}
			if (age < 18) {
				throw new GenericError("You are too young to use this application");
			}

			await this.repo.findEmail(this.user.email);
			
			const preferenceEntity: PreferenceEntity = {
				age_minimum: 18,
				age_maximum: 100
			};
			const tempPreferenceEntity: PreferenceEntity = await this.preferenceRepo.updatePreference(preferenceEntity);

			const profileDataEntity: ProfileDataEntity = { 
				birthday: this.birthday,
				description: "",
				firstName: "",
				lastName: "",
				phoneNbr: "",
				genre: undefined,
				orientation: undefined,
				search: undefined,
				preference: tempPreferenceEntity,
				tags: [],
				videos: []
			};
			//console.log(profileDataEntity)
			const newProfileDataEntity: ProfileDataEntity =  await this.profileDataRepo.createProfile(profileDataEntity);
			this.user.profileData = newProfileDataEntity;
			//console.log(newProfileDataEntity);
			await this.repo.createAccount(this.user);


			const response: GenericResponseEntity = {
				message: "User created"
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
