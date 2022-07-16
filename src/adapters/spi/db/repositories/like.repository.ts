import { EntityManager } from "typeorm";

import { LikeModel } from "adapters/spi/db/models/like.model";
import { LikeMapper } from "adapters/spi/db/mappers/like.mapper";

import { AbstractLikerepository } from "application/repositories/like.repository.abstract";
import { DbMapper } from "application/mappers/db.mapper";

import { LikeEntity } from "domain/entities/like.entity";

import { GenericError } from "domain/errors/generic.error.entity";
import { ProfileDataEntity } from "domain/entities/profileData.entity";

export class LikeRepository implements AbstractLikerepository {
	private entityManager: EntityManager;
	private mapper: DbMapper<LikeEntity, LikeModel>;

	constructor(entityManager: EntityManager) {
		this.entityManager = entityManager;
		this.mapper = new LikeMapper();
	}

	async create(like: LikeEntity): Promise<LikeEntity> {
		try {
			const data: LikeModel = await this.entityManager.save(this.mapper.toModel(like));
			return this.mapper.toEntity(data);
		} catch {
			throw new GenericError("Like relation cannot be created");
		} 
	}

	async getByUsersIds(like: LikeEntity): Promise<LikeEntity> {
		try {
			const data: LikeModel = await this.entityManager.getRepository(LikeModel).findOne({ from: like.from, to: like.to });

			if (data) {
				return this.mapper.toEntity(data);
			}
			return undefined;
		} catch {
			throw new GenericError("Like relation cannot be find");
		} 
	}

	async getTo(user: ProfileDataEntity): Promise<LikeEntity[]> {
		try {
			const datas: LikeModel[] = await this.entityManager.getRepository(LikeModel).find({ to: user, matched: false });
			if (datas) {
				const entities: LikeEntity[] = [];

				for (const data of datas) {
					entities.push(this.mapper.toEntity(data));
				}

				return entities;
			}

			return undefined;
		} catch {
			throw new GenericError("Like relation cannot be find");
		} 
	}

	async getMatch(user: ProfileDataEntity): Promise<LikeEntity[]> {
		try {
			const datas: LikeModel[] = await this.entityManager.getRepository(LikeModel).find({ from: user, matched: true });
			if (datas) {
				const entities: LikeEntity[] = [];

				for (const data of datas) {
					entities.push(this.mapper.toEntity(data));
				}
				return entities;
			}
			return undefined;
		} catch {
			throw new GenericError("No match found");
		}
	}

}
