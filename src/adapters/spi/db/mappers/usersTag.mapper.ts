import { DbMapper } from "application/mappers/db.mapper";
import { ProfileDataMapper } from "adapters/spi/db/mappers/profileData.mapper";
import { TagMapper } from "adapters/spi/db/mappers/tag.mapper";

import { UsersTagModel } from "adapters/spi/db/models/usersTag.model";

import { UsersTagEntity } from "domain/entities/usersTag.entity";

export class UsersTagMapper implements DbMapper<UsersTagEntity, UsersTagModel> {
	toEntity(modelObj: UsersTagModel): UsersTagEntity {
		const entity: UsersTagEntity = {
			id: modelObj.id,
			tag: modelObj.tag,
			userProfile: undefined
		};
		if (modelObj.tag) {
			const tagMapper: TagMapper = new TagMapper();
			entity.tag = tagMapper.toEntity(modelObj.tag);
		}

		if (modelObj.userProfile) {
			const profileDataMapper: ProfileDataMapper = new ProfileDataMapper();
			entity.userProfile = profileDataMapper.toEntity(modelObj.userProfile);
		}

		return entity;
        
	}

	toModel(entityObj: UsersTagEntity): UsersTagModel {
		const model: UsersTagModel = new UsersTagModel();

		model.id = entityObj.id;
		model.createDate = new Date();
		model.updateDate = new Date();
        
		if (entityObj.tag) {
			const tagMapper: TagMapper = new TagMapper();
			model.tag = tagMapper.toModel(entityObj.tag);
		}
		else {
			model.tag = undefined;
		}

		if (entityObj.userProfile) {
			const profileDataMapper: ProfileDataMapper = new ProfileDataMapper();
			model.userProfile =  profileDataMapper.toModel(entityObj.userProfile);
		}
		else {
			model.userProfile = undefined;
		}

		return model;
	}
}
