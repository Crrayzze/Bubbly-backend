import { ApiMapper } from "application/mappers/api.mapper";
import { UserVerifyEmailEntity } from "domain/entities/userVerifyEmail.entity";
import { UserVerifyEmailPayload } from "adapters/api/authentication/payloads/authentication.payload";
import { UserPresenter } from "adapters/api/client/presenters/user.presenter";

export class UserVerifyEmailApiMapper implements ApiMapper<UserVerifyEmailEntity, UserPresenter, UserVerifyEmailPayload> {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	toEntity(payload: UserVerifyEmailPayload): UserVerifyEmailEntity {
		const entity: UserVerifyEmailEntity = {
			email: payload.email,
			code: payload.code
		};
		return entity;
	}

  	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	toApi(entity: UserVerifyEmailEntity): UserPresenter {
		throw new Error("not implemented");
	}
}
