import { ApiMapper } from "application/mappers/api.mapper";
import { TagEntity } from "domain/entities/tag.entity";
import { BasePayloadEntity } from "domain//payloads/base.payload.entity";
import { TagPresenter } from "adapters/api/client/presenters/tag.presenter";

export class TagApiMapper implements ApiMapper<TagEntity, TagPresenter, BasePayloadEntity> {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	toEntity(payload: BasePayloadEntity): TagEntity {
		throw new Error("not implemented");
	}

	toApi(entity: TagEntity): TagPresenter {
		const presenter: TagPresenter = {
			id: entity.id,
            name: entity.name
		};

		return presenter;
	}
}
