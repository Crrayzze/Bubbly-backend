import { EntityManager } from "typeorm";

import { UsersTagModel } from "../models/usersTag.model";
import { UsersTagMapper } from "../mappers/usersTag.mapper";

import { DbMapper } from "application/mappers/db.mapper";

import { UsersTagEntity } from "domain/entities/usersTag.entity";
import { GenericError } from "domain/errors/generic.error.entity";
import { AbstractUsersTagRepository } from "application/repositories/usersTag.repository.abstract";
import { ProfileDataModel } from "../models/profileData.model";

export class UsersTagRepository implements AbstractUsersTagRepository {
	private entityManager: EntityManager;
	private mapper: DbMapper<UsersTagEntity, UsersTagModel>;

	constructor(entityManager: EntityManager) {
		this.entityManager = entityManager;
		this.mapper = new UsersTagMapper();
	}

	async delete(id: string): Promise<void> {
		try {
			const datas: UsersTagModel[] = await this.entityManager.getRepository(UsersTagModel).find({ id });
			await this.entityManager.getRepository(UsersTagModel).remove(datas);
		} catch {
			throw new GenericError("Cannot delete UsersTag relation");
		}
	}

	async create(userTagEntity: UsersTagEntity): Promise<void> {
		try {
			await this.entityManager.getRepository(UsersTagModel).save(this.mapper.toModel(userTagEntity));
		} catch {
			throw new GenericError("Cannot create UsersTag relation");
		}
	}

	async getById(profile: ProfileDataModel): Promise<UsersTagEntity[]> {
		try {
			const datas: UsersTagModel[] = await this.entityManager.getRepository(UsersTagModel).find({ userProfile: profile });
			const entities: UsersTagEntity[] = [];
			for (const data of datas) {
				data.userProfile = profile;
				entities.push(this.mapper.toEntity(data));
			}

			return entities;
		} catch {
			throw new GenericError("Cannot get usersTag by id");
		}
	}

}
