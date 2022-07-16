import { ApiMapper } from "application/mappers/api.mapper";
import { GenericResponseEntity } from "domain/entities/genericResponse.entity";
import { UserRegisterPayload } from "adapters/api/authentication/payloads/authentication.payload";
import { GenericResponsePresenter } from "adapters/api/authentication/presenters/genericResponse.authentication.presenter";

export class GenericResponseApiMapper implements ApiMapper<GenericResponseEntity, GenericResponsePresenter, UserRegisterPayload> {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	toEntity(payload: UserRegisterPayload): GenericResponseEntity {
		throw new Error("not implemented");
	}

	toApi(entity: GenericResponseEntity): GenericResponsePresenter {
		const presenter: GenericResponsePresenter = {
			message: entity.message
		};

		return presenter;
	}
}
