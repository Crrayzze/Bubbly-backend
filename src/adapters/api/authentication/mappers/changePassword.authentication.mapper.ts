import { ApiMapper } from "application/mappers/api.mapper";
import { UserChangePasswordEntity } from "domain/entities/userChangePassword.entity";
import { UserChangePasswordPayload } from "adapters/api/authentication/payloads/authentication.payload";
import { UserPresenter } from "adapters/api/client/presenters/user.presenter";

export class UserChangePasswordApiMapper implements ApiMapper<UserChangePasswordEntity, UserPresenter, UserChangePasswordPayload> {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	toEntity(payload: UserChangePasswordPayload): UserChangePasswordEntity {
		const entity: UserChangePasswordEntity = {
			email: payload.email,
			password: payload.password
		};
		return entity;
	}

  	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	toApi(entity: UserChangePasswordEntity): UserPresenter {
		throw new Error("not implemented");
	}
}
