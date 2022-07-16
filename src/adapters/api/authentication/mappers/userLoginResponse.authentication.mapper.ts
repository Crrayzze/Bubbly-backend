import { ApiMapper } from "application/mappers/api.mapper";
import { LoginResponseEntity } from "domain/entities/loginResponse.entity";
import { UserRegisterPayload } from "adapters/api/authentication/payloads/authentication.payload";
import { LoginResponsePresenter } from "adapters/api/authentication/presenters/loginResponse.authentication.presenter";

export class LogginResponseApiMapper implements ApiMapper<LoginResponseEntity, LoginResponsePresenter, UserRegisterPayload> {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	toEntity(payload: UserRegisterPayload): LoginResponseEntity {
		throw new Error("not implemented");
	}

	toApi(entity: LoginResponseEntity): LoginResponsePresenter {
		const presenter: LoginResponsePresenter = {
			message: entity.message,
			token: entity.token
		};

		return presenter;
	}
}
