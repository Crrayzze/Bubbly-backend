import { DbMapper } from "application/mappers/db.mapper";

import { PreferenceModel } from "adapters/spi/db/models/preference.model";

import { PreferenceEntity } from "domain/entities/preference.entity";

export class PreferenceMapper implements DbMapper<PreferenceEntity, PreferenceModel> {
	toEntity(model: PreferenceModel): PreferenceEntity {
		const entity: PreferenceEntity = {
			id: model.id,
			age_minimum: model.age_minimum,
            age_maximum: model.age_maximum
		};
		return entity;
	}

	toModel(entity: PreferenceEntity): PreferenceModel {
		const model: PreferenceModel = new PreferenceModel();

		model.createDate = new Date();
		model.updateDate = new Date();
		model.id = entity.id;
		model.age_minimum = entity.age_minimum;
        model.age_maximum = entity.age_maximum;

		return model;
	}
}
