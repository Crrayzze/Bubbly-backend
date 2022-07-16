import { EntityManager } from "typeorm";

import { VideoModel } from "../models/video.model";
import { VideoMapper } from "../mappers/video.mapper";

import { AbstractVideoRepository } from "application/repositories/video.repository.abstract";
import { DbMapper } from "application/mappers/db.mapper";

import { VideoEntity } from "domain/entities/video.entity";

import { GenericError } from "domain/errors/generic.error.entity";
import { ProfileDataModel } from "../models/profileData.model";

export class VideoRepository implements AbstractVideoRepository {
	private entityManager: EntityManager;
	private mapper: DbMapper<VideoEntity, VideoModel>;

	constructor(entityManager: EntityManager) {
		this.entityManager = entityManager;
		this.mapper = new VideoMapper();
	}

	async postVideo(video: VideoEntity): Promise<void> {
		try {
			await this.entityManager.save(this.mapper.toModel(video));
		} catch {
			throw new GenericError("Video relation cannot be created");
		} 
	}

	async getByProfile(profile: ProfileDataModel): Promise<VideoEntity[]> {
		try {
			const datas: VideoModel[] = await this.entityManager.getRepository(VideoModel).find({ profile });

			const entities: VideoEntity[] = [];
			for (const data of datas) {
				entities.push(this.mapper.toEntity(data));
			}
			return entities;
		} catch {
			throw new GenericError("Cannot find video of the related profile");
		}
	}

}
