import { DbMapper } from "application/mappers/db.mapper";

import { OrientationModel } from "adapters/spi/db/models/orientation.model";

import { OrientationEntity } from "domain/entities/orientation.entity";

export class OrientationMapper implements DbMapper<OrientationEntity, OrientationModel> {
	toEntity(model: OrientationModel): OrientationEntity {
		const entity: OrientationEntity = {
			id: model.id,
			orientation: model.orientation
		};
		return entity;
	}

	toModel(entity: OrientationEntity): OrientationModel {
		const model: OrientationModel = new OrientationModel();

		model.createDate = new Date();
		model.updateDate = new Date();
		model.id = entity.id;
		model.orientation = entity.orientation;

		return model;
	}
}
