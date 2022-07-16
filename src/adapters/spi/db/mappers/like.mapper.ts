import { DbMapper } from "application/mappers/db.mapper";

import { LikeModel } from "../models/like.model";

import { LikeEntity } from "domain/entities/like.entity";

import { ProfileDataMapper } from "./profileData.mapper";


export class LikeMapper implements DbMapper<LikeEntity, LikeModel> {
	toEntity(model: LikeModel): LikeEntity {
		const entity: LikeEntity = {
			id: model.id,
			from: undefined,
			to: undefined,
			matched: model.matched,
			updateData: model.updateDate
		};

		const profileDataMapper: ProfileDataMapper = new ProfileDataMapper();

		if (model.from) {
			entity.from = profileDataMapper.toEntity(model.from);
		}

		if (model.to) {
			entity.to = profileDataMapper.toEntity(model.to);
		}

		return entity;
	}

	toModel(entity: LikeEntity): LikeModel {
		const model: LikeModel = new LikeModel();
		model.createDate = new Date();
		model.updateDate = new Date();
		model.id = entity.id;
		model.matched = entity.matched;

		const profileDataMapper: ProfileDataMapper = new ProfileDataMapper();

		if (entity.from) {
			model.from = profileDataMapper.toModel(entity.from);
		}

		if (entity.to) {
			model.to = profileDataMapper.toModel(entity.to);
		}
        
		return model;
	}
}
