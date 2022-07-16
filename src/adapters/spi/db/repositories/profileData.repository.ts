import { EntityManager } from "typeorm";

import { ProfileDataModel } from "adapters/spi/db/models/profileData.model";
import { ProfileDataMapper } from "adapters/spi/db/mappers/profileData.mapper";

import { AbstractProfileDataRepository } from "application/repositories/profileData.repository.abstract";
import { DbMapper } from "application/mappers/db.mapper";

import { ProfileDataEntity } from "domain/entities/profileData.entity";
import { GenericError } from "domain/errors/generic.error.entity";

export class ProfileDataRepository implements AbstractProfileDataRepository {
	private entityManager: EntityManager;
	private mapper: DbMapper<ProfileDataEntity, ProfileDataModel>;

	constructor(entityManager: EntityManager) {
		this.entityManager = entityManager;
		this.mapper = new ProfileDataMapper();
	}

	async updateDescription(profile: ProfileDataEntity): Promise<void> {
		  try {
		  	await this.entityManager.save(this.mapper.toModel(profile));
		  } catch {
		  	throw new GenericError("Account not updated");
		  }
	}

	async createProfile(profile: ProfileDataEntity): Promise<ProfileDataEntity> {
		try {
			const data: ProfileDataModel = await this.entityManager.save(this.mapper.toModel(profile));
			return this.mapper.toEntity(data);
		} catch {
			throw new GenericError("ProfileData cannot be created");
		}
	}

	async updateProfile(profile: ProfileDataEntity): Promise<void> {
		try {
			await this.entityManager.save(this.mapper.toModel(profile));
		} catch {
			throw new GenericError("Account not updated");
		}
	}

	async getById(id: string): Promise<ProfileDataEntity> {
		try {
			const data: ProfileDataModel = await this.entityManager.getRepository(ProfileDataModel).findOneOrFail({ id });
			return this.mapper.toEntity(data);
		} catch {
			throw new GenericError("Cannot fetch the profile with this id");
		}

	}

}
