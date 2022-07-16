import { ApiMapper } from "application/mappers/api.mapper";
import { UserChangeEmailEntity } from "domain/entities/userChangeEmail.entity";
import { UserChangeEmailPayload } from "adapters/api/authentication/payloads/authentication.payload";
import { UserPresenter } from "adapters/api/client/presenters/user.presenter";

export class UserChangeEmailApiMapper implements ApiMapper<UserChangeEmailEntity, UserPresenter, UserChangeEmailPayload> {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	toEntity(payload: UserChangeEmailPayload): UserChangeEmailEntity {
		const entity: UserChangeEmailEntity = {
			oldEmail: payload.oldEmail,
			email: payload.email
		};
		return entity;
	}

  	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	toApi(entity: UserChangeEmailEntity): UserPresenter {
		throw new Error("not implemented");
	}
}
