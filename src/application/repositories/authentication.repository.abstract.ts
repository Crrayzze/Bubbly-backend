import { UserEntity } from "domain/entities/user.entity";

export interface AbstractAuthenticationRepository {
	createAccount(user: UserEntity): Promise<UserEntity>;
	login(user: UserEntity): Promise<string>;
	findEmail(email: string): Promise<boolean>;
	getAccountByEmail(email: string): Promise<UserEntity>;
	updateAccount(user: UserEntity): Promise<void>;
	middleware(token: string): Promise<UserEntity>;
	deleteAccount(user: UserEntity): Promise<void>;
}
