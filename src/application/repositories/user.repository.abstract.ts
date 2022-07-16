import { UserEntity } from "domain/entities/user.entity";

export interface AbstractUserRepository {
	fetchById(id: string): Promise<UserEntity>;
}
