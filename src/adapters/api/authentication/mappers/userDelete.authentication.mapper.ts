import { ApiMapper } from "application/mappers/api.mapper";
import { UserEntity } from "domain/entities/user.entity";
import { UserDeletePayload } from "adapters/api/authentication/payloads/authentication.payload";
import { UserPresenter } from "adapters/api/client/presenters/user.presenter";

export class UserDeleteApiMapper implements ApiMapper<UserEntity, UserPresenter, UserDeletePayload> {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	toEntity(payload: UserDeletePayload): UserEntity {
		const entity: UserEntity = {
			email: payload.email,
			password: undefined,
			confirmed: undefined,
			code: undefined,
			profileData: undefined
		};
		return entity;
	}

  	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	toApi(entity: UserEntity): UserPresenter {
		throw new Error("not implemented");
	}
}
