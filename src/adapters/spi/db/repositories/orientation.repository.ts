import { EntityManager } from "typeorm";

import { OrientationModel } from "adapters/spi/db/models/orientation.model";
import { OrientationMapper } from "adapters/spi/db/mappers/orientation.mapper";

import { AbstractOrientationRepository } from "application/repositories/orientation.repository.abstract";
import { DbMapper } from "application/mappers/db.mapper";

import { OrientationEntity } from "domain/entities/orientation.entity";
import { GenericError } from "domain/errors/generic.error.entity";

export class OrientationRepository implements AbstractOrientationRepository {
	private entityManager: EntityManager;
	private mapper: DbMapper<OrientationEntity, OrientationModel>;

	constructor(entityManager: EntityManager) {
		this.entityManager = entityManager;
		this.mapper = new OrientationMapper();
	}

	async getOrientation(): Promise<OrientationEntity[]> {
		try {
			const datas: OrientationModel[] = await this.entityManager.getRepository(OrientationModel).find();
			const entities: OrientationEntity[] = [];
			for (const data of datas) {
				entities.push(this.mapper.toEntity(data));
			}
			return (entities);
		}
		catch{
			throw new GenericError("Cannot fetch orientation");
		}
	}

	async getById(id: string): Promise<OrientationEntity> {
		try {
			const data: OrientationModel = await this.entityManager.getRepository(OrientationModel).findOneOrFail({ id });
			return this.mapper.toEntity(data);
		} catch {
			throw new GenericError("Cannot fetch orientation by id");
		}
	}

}
