import { ApiMapper } from "application/mappers/api.mapper";
import { UserEntity } from "domain/entities/user.entity";
import { UserRegisterPayload } from "adapters/api/authentication/payloads/authentication.payload";
import { UserPresenter } from "adapters/api/client/presenters/user.presenter";
import { ProfileDataEntity } from "domain/entities/profileData.entity";

import { createCode } from "adapters/spi/shared/utils/createCode";

export class UserRegisterApiMapper implements ApiMapper<UserEntity, UserPresenter, UserRegisterPayload> {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	toEntity(payload: UserRegisterPayload): UserEntity {
		const entity: UserEntity = {
			email: payload.email,
			password: payload.password,
			confirmed: false,
			profileData: new ProfileDataEntity(),
			code : createCode()
		};
		return entity;
	}

  	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	toApi(entity: UserEntity): UserPresenter {
		throw new Error("not implemented");
	}
}
