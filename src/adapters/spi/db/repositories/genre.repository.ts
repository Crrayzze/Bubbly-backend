import { EntityManager } from "typeorm";

import { GenreModel } from "../models/genre.model";
import { GenreMapper } from "../mappers/genre.mapper";

import { AbstractGenreRepository } from "application/repositories/genre.repository.abstract";
import { DbMapper } from "application/mappers/db.mapper";

import { GenreEntity } from "domain/entities/genre.entity";
import { GenericError } from "domain/errors/generic.error.entity";

export class GenreRepository implements AbstractGenreRepository {
	private entityManager: EntityManager;
	private mapper: DbMapper<GenreEntity, GenreModel>;

	constructor(entityManager: EntityManager) {
		this.entityManager = entityManager;
		this.mapper = new GenreMapper();
	}

	async getGenre(): Promise<GenreEntity[]> {
		try {
			const datas: GenreModel[] = await this.entityManager.getRepository(GenreModel).find();
			const entities: GenreEntity[] = [];
			for (const data of datas) {
				entities.push(this.mapper.toEntity(data));
			}
			return (entities);
		}
		catch{
			throw new GenericError("Cannot fetch genre");
		}
	}

	async getById(id: string): Promise<GenreEntity> {
		try {
			const data: GenreModel = await this.entityManager.getRepository(GenreModel).findOneOrFail({ id });
			return this.mapper.toEntity(data);
		} catch {
			throw new GenericError("Cannot fetch genre by id");
		}
	}
}
