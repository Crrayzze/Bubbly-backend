import { ApiMapper } from "application/mappers/api.mapper";
import { OrientationEntity } from "domain/entities/orientation.entity";
import { BasePayloadEntity } from "domain/payloads/base.payload.entity";
import { OrientationPresenter } from "adapters/api/client/presenters/orientation.presenter";

export class OrientationApiMapper implements ApiMapper<OrientationEntity, OrientationPresenter, BasePayloadEntity> {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	toEntity(payload: BasePayloadEntity): OrientationEntity {
		throw new Error("not implemented");
	}

	toApi(entity: OrientationEntity): OrientationPresenter {
		const presenter: OrientationPresenter = {
			id: entity.id,
			orientation: entity.orientation
		};

		return presenter;
	}
}
