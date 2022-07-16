import { EntityManager } from "typeorm";

import { UserMapper } from "adapters/spi/db/mappers/user.mapper";
import { UserModel } from "adapters/spi/db/models/user.model";

import { AbstractUserRepository } from "application/repositories/user.repository.abstract";
import { DbMapper } from "application/mappers/db.mapper";


import { UserEntity } from "domain/entities/user.entity";
import { GenericError } from "domain/errors/generic.error.entity";

export class UserRepository implements AbstractUserRepository {
	private entityManager: EntityManager;
	private mapper: DbMapper<UserEntity, UserModel>;

	constructor(entityManager: EntityManager) {
		this.entityManager = entityManager;
		this.mapper = new UserMapper();
	}

	async fetchById(id: string): Promise<UserEntity> {
		try {
			const data: UserModel = await this.entityManager.getRepository(UserModel).findOneOrFail({ id });
			return this.mapper.toEntity(data);
		} catch {
			throw new GenericError("Account not created");
		}
	}
}
