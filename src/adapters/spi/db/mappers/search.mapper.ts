import { DbMapper } from "application/mappers/db.mapper";

import { SearchModel } from "adapters/spi/db/models/search.model";

import { SearchEntity } from "domain/entities/search.entity";

export class SearchMapper implements DbMapper<SearchEntity, SearchModel> {
	toEntity(model: SearchModel): SearchEntity {
		const entity: SearchEntity = {
			id: model.id,
			search: model.search
		};
		return entity;
	}

	toModel(entity: SearchEntity): SearchModel {
		const model: SearchModel = new SearchModel();

		model.createDate = new Date();
		model.updateDate = new Date();
		model.id = entity.id;
		model.search = entity.search;

		return model;
	}
}