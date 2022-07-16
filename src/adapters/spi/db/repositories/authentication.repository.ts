import { EntityManager } from "typeorm";

import { UserMapper } from "adapters/spi/db/mappers/user.mapper";
import { UserModel } from "adapters/spi/db/models/user.model";

import { AbstractAuthenticationRepository } from "application/repositories/authentication.repository.abstract";
import { DbMapper } from "application/mappers/db.mapper";

import { UserEntity } from "domain/entities/user.entity";
import { GenericError } from "domain/errors/generic.error.entity";

export class AuthenticationRepository implements AbstractAuthenticationRepository {
	private entityManager: EntityManager;
	private mapper: DbMapper<UserEntity, UserModel>;

	constructor(entityManager: EntityManager) {
		this.entityManager = entityManager;
		this.mapper = new UserMapper();
	}

	async createAccount(user: UserEntity): Promise<UserEntity> {
		try {
			const data: UserModel = await this.entityManager.save(this.mapper.toModel(user));
			return this.mapper.toEntity(data);
		} catch {
			throw new GenericError("Account not created");
		}
	}

	async deleteAccount(user: UserEntity): Promise<void> {
		try {
			await this.entityManager.getRepository(UserModel).delete({email : user.email});
		} catch {
			throw new GenericError("Account not deleted");
		}
	}

	async login(user: UserEntity): Promise<string> {
		try {
			const userModel: UserModel = await this.entityManager.getRepository(UserModel).findOneOrFail({ email: user.email, password: user.password });
			const userEntity: UserEntity = this.mapper.toEntity(userModel);
			userEntity.token = this.generateToken();
			await this.entityManager.save(this.mapper.toModel(userEntity));
			return userEntity.token;
		} catch {
			throw new GenericError("Wrong email or password");
		}
	}
	async findEmail(email: string): Promise<boolean> {
		try {
			const userModel: UserModel = await this.entityManager.getRepository(UserModel).findOne({ email});

			if (userModel) {
				return true;
			}
			return false;

		} catch {
			throw new GenericError("Something went wrong while fetching email");
		}
	}

	async getAccountByEmail(email: string): Promise<UserEntity> {
		try {
			const userModel: UserModel = await this.entityManager.getRepository(UserModel).findOne({email});
			return (this.mapper.toEntity(userModel));
		} catch (err) {
			throw new GenericError("Something went wrong while fetching account");
		}
	}

	async updateAccount(user: UserEntity): Promise<void> {
		try {
			await this.entityManager.save(this.mapper.toModel(user));
		} catch {
			throw new GenericError("Account not updated");
		}
	}

	async middleware(token: string): Promise<UserEntity> {
		try {
			const userModel: UserModel = await this.entityManager.getRepository(UserModel).findOneOrFail({ token });
			return this.mapper.toEntity(userModel);
		} catch {
			throw new GenericError("Something went wrong while finding the associated user");
		}
	}


	private generateToken(): string {
		let token: string = "";
		const possible: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for (let i: number = 0; i < 20; i++)
		    {token += possible.charAt(Math.floor(Math.random() * possible.length));}
		return token;
	}

}
