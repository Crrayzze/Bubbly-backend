import { EntityManager } from "typeorm";

import { PreferenceModel } from "adapters/spi/db/models/preference.model";
import { PreferenceMapper } from "adapters/spi/db/mappers/preference.mapper";

import { AbstractPreferenceRepository } from "application/repositories/preference.repository.abstract";
import { DbMapper } from "application/mappers/db.mapper";

import { PreferenceEntity } from "domain/entities/preference.entity";
import { GenericError } from "domain/errors/generic.error.entity";

export class PreferenceRepository implements AbstractPreferenceRepository {
	private entityManager: EntityManager;
	private mapper: DbMapper<PreferenceEntity, PreferenceModel>;

	constructor(entityManager: EntityManager) {
		this.entityManager = entityManager;
		this.mapper = new PreferenceMapper();
	}

	async getPreference(): Promise<PreferenceEntity[]> {
		try {
			const datas: PreferenceModel[] = await this.entityManager.getRepository(PreferenceModel).find();
			const entities: PreferenceEntity[] = [];
			for (const data of datas) {
				entities.push(this.mapper.toEntity(data));
			}
			return (entities);
		}
		catch{
			throw new GenericError("Cannot fetch preference");
		}
	}

	async updatePreference(preference: PreferenceEntity): Promise<PreferenceEntity> {
		try {
			const data: PreferenceModel = await this.entityManager.save(this.mapper.toModel(preference));
			return this.mapper.toEntity(data);
		} catch {
			throw new GenericError("Preference cannot be created/updated");
		}
	}

	async getById(id: string): Promise<PreferenceEntity> {
		try {
			const data: PreferenceModel = await this.entityManager.getRepository(PreferenceModel).findOneOrFail({ id });
			return this.mapper.toEntity(data);
		} catch {
			throw new GenericError("Cannot fetch preference by id");
		}
	}

}