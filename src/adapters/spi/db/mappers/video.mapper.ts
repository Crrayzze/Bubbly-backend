import { DbMapper } from "application/mappers/db.mapper";

import { VideoModel } from "../models/video.model";

import { VideoEntity } from "domain/entities/video.entity";

import { ProfileDataMapper } from "./profileData.mapper";

export class VideoMapper implements DbMapper<VideoEntity, VideoModel> {
	toEntity(model: VideoModel): VideoEntity {
		const entity: VideoEntity = {
			id: model.id,
			publishDate: model.PublishDate,
			url: model.Url,
			profile: undefined
		};

		if (model.profile) {
			const profileDataMapper: ProfileDataMapper = new ProfileDataMapper();
			entity.profile = profileDataMapper.toEntity(model.profile);
		}


		return entity;
	}

	toModel(entity: VideoEntity): VideoModel {
		const model: VideoModel = new VideoModel();
		model.createDate = new Date();
		model.updateDate = new Date();
		model.id = entity.id;
		model.PublishDate = new Date();
		model.Url = entity.url;

		if (entity.profile) {
			const profileDataMapper: ProfileDataMapper = new ProfileDataMapper();
			model.profile = profileDataMapper.toModel(entity.profile);
		}
        
		return model;
	}
}
