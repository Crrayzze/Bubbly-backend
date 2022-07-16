import { ApiMapper } from "application/mappers/api.mapper";
import { GenericResponseEntity } from "domain/entities/genericResponse.entity";
import { BasePayloadEntity } from "domain/payloads/base.payload.entity";
import { GenericResponsePresenter } from "adapters/api/authentication/presenters/genericResponse.authentication.presenter";

export class GenericResponseApiMapper implements ApiMapper<GenericResponseEntity, GenericResponsePresenter, BasePayloadEntity> {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	toEntity(payload: BasePayloadEntity): GenericResponseEntity {
		throw new Error("not implemented");
	}

	toApi(entity: GenericResponseEntity): GenericResponsePresenter {
		const presenter: GenericResponsePresenter = {
			message: entity.message
		};

		return presenter;
	}
}
