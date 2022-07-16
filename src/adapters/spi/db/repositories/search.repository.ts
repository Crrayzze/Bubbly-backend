import { EntityManager } from "typeorm";

import { SearchModel } from "adapters/spi/db/models/search.model";
import { SearchMapper } from "adapters/spi/db/mappers/search.mapper";

import { AbstractSearchRepository } from "application/repositories/search.repository.abstract";
import { DbMapper } from "application/mappers/db.mapper";

import { SearchEntity } from "domain/entities/search.entity";
import { GenericError } from "domain/errors/generic.error.entity";

export class SearchRepository implements AbstractSearchRepository {
	private entityManager: EntityManager;
	private mapper: DbMapper<SearchEntity, SearchModel>;

	constructor(entityManager: EntityManager) {
		this.entityManager = entityManager;
		this.mapper = new SearchMapper();
	}

	async getSearch(): Promise<SearchEntity[]> {
		try {
			const datas: SearchModel[] = await this.entityManager.getRepository(SearchModel).find();
			const entities: SearchEntity[] = [];
			for (const data of datas) {
				entities.push(this.mapper.toEntity(data));
			}
			return (entities);
		}
		catch{
			throw new GenericError("Cannot fetch Search");
		}
	}

	async getById(id: string): Promise<SearchEntity> {
		try {
			const data: SearchModel = await this.entityManager.getRepository(SearchModel).findOneOrFail({ id });
			return this.mapper.toEntity(data);
		} catch {
			throw new GenericError("Cannot fetch search by id");
		}
	}
}