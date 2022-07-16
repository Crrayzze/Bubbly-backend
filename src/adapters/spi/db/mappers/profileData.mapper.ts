import { DbMapper } from "application/mappers/db.mapper";
import { OrientationMapper } from "adapters/spi/db/mappers/orientation.mapper";
import { SearchMapper } from "adapters/spi/db/mappers/search.mapper";
import { PreferenceMapper } from "adapters/spi/db/mappers/preference.mapper";

import { ProfileDataModel } from "adapters/spi/db/models/profileData.model";

import { ProfileDataEntity } from "domain/entities/profileData.entity";
import { GenreMapper } from "./genre.mapper";



export class ProfileDataMapper implements DbMapper<ProfileDataEntity, ProfileDataModel> {
	toEntity(model: ProfileDataModel): ProfileDataEntity {
		const entity: ProfileDataEntity = {
			id: model.id,
			firstName: model.firstName,
			lastName: model.lastName,
			phoneNbr: model.phoneNbr,
			birthday: model.birthday,
			description: model.description,
			orientation: undefined,
			genre: undefined,
			search: undefined,
			preference: undefined,
			tags: [],
			videos: []
		};

		const orientationMapper: OrientationMapper = new OrientationMapper();
		if (model.orientation) {
			entity.orientation = orientationMapper.toEntity(model.orientation);
		}

		const genreMapper: GenreMapper = new GenreMapper();
		if (model.genre) {
			entity.genre = genreMapper.toEntity(model.genre);
		}

		const searchMapper: SearchMapper = new SearchMapper();
		if (model.search) {
			entity.search = searchMapper.toEntity(model.search);
		}

		const preferenceMapper: PreferenceMapper = new PreferenceMapper();
		if (model.preference) {
			entity.preference = preferenceMapper.toEntity(model.preference);
		}

		return entity;
	}

	toModel(entity: ProfileDataEntity): ProfileDataModel {
		const model: ProfileDataModel = new ProfileDataModel();
		model.firstName = entity.firstName;
		model.lastName = entity.lastName;
		model.createDate = new Date();
		model.updateDate = new Date();
		model.id = entity.id;
		model.phoneNbr = entity.phoneNbr;
		model.birthday = entity.birthday;
		model.description = entity.description;

		if (entity.orientation) {
			const orientationMapper: OrientationMapper = new OrientationMapper();
			model.orientation = orientationMapper.toModel(entity.orientation);
		}

		if (entity.search) {
			const searchMapper: SearchMapper = new SearchMapper();
			model.search = searchMapper.toModel(entity.search);
		}

		if (entity.genre) {
			const genreMapper: GenreMapper = new GenreMapper();
			model.genre = genreMapper.toModel(entity.genre);
		}

		if (entity.preference) {
			const preferenceMapper: PreferenceMapper = new PreferenceMapper();
			model.preference = preferenceMapper.toModel(entity.preference);
		}
        
		return model;
	}
}
