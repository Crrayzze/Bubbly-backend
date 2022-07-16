import { DbMapper } from "application/mappers/db.mapper";

import { GenreModel } from "../models/genre.model";

import { GenreEntity } from "domain/entities/genre.entity"; 

export class GenreMapper implements DbMapper<GenreEntity, GenreModel> {
	toEntity(model: GenreModel): GenreEntity {
		const entity: GenreEntity = {
			id: model.id,
			genre: model.name
		};
		return entity;
	}

	toModel(entity: GenreEntity): GenreModel {
		const model: GenreModel = new GenreModel();

		model.createDate = new Date();
		model.updateDate = new Date();
		model.id = entity.id;
		model.name = entity.genre;

		return model;
	}
}
