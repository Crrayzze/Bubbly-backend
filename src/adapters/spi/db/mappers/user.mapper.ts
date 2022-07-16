import { UserModel } from "adapters/spi/db/models/user.model";

import { DbMapper } from "application/mappers/db.mapper";

import { UserEntity } from "domain/entities/user.entity";
import { ProfileDataMapper } from "./profileData.mapper";

export class UserMapper implements DbMapper<UserEntity, UserModel> {
	toEntity(model: UserModel): UserEntity {
		const entity: UserEntity = {
			id: model.id,
			email: model.email,
			password: model.password,
			confirmed: model.confirmed,
			code: model.code,
			token: model.token,
			profileData: undefined
		};

		if (model.data) {
			const profileDataMapper: ProfileDataMapper = new ProfileDataMapper();
			entity.profileData = profileDataMapper.toEntity(model.data);
		}

		return entity;
	}

	toModel(entity: UserEntity): UserModel {
		const model: UserModel = new UserModel();

		model.email = entity.email;
		model.confirmed = entity.confirmed;
		model.createDate = new Date();
		model.updateDate = new Date();
		model.id = entity.id;
		model.password = entity.password;
		model.code = entity.code;
		model.token = entity.token;

		if (entity.profileData) {
			const profileDataMapper: ProfileDataMapper = new ProfileDataMapper();
			model.data = profileDataMapper.toModel(entity.profileData);
		}

		return model;
	}
}
