import { ApiMapper } from "application/mappers/api.mapper";
import { UserEntity } from "domain/entities/user.entity";
import { UserPayload } from "adapters/api/client/payloads/user.payload";
import { UserPresenter } from "adapters/api/client/presenters/user.presenter";

export class UserApiMapper implements ApiMapper<UserEntity, UserPresenter, UserPayload> {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	toEntity(payload: UserPayload): UserEntity {
		throw new Error("not implemented");
	}

	toApi(entity: UserEntity): UserPresenter {
		const presenter: UserPresenter = {
			id: entity.id,
			email: entity.email,
			password: entity.password,
			confirmed: entity.confirmed,
			code: entity.code
		};

		return presenter;
	}
}
