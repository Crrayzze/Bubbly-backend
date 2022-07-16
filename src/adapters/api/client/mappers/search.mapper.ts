import { ApiMapper } from "application/mappers/api.mapper";
import { SearchEntity } from "domain/entities/search.entity";
import { BasePayloadEntity } from "domain/payloads/base.payload.entity";
import { SearchPresenter } from "adapters/api/client/presenters/search.presenter";

export class SearchApiMapper implements ApiMapper<SearchEntity, SearchPresenter, BasePayloadEntity> {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	toEntity(payload: BasePayloadEntity): SearchEntity {
		throw new Error("not implemented");
	}

	toApi(entity: SearchEntity): SearchPresenter {
		const presenter: SearchPresenter = {
			id: entity.id,
			search: entity.search
		};

		return presenter;
	}
}
