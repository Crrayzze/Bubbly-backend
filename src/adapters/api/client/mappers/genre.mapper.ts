import { ApiMapper } from "application/mappers/api.mapper";
import { GenreEntity } from "domain/entities/genre.entity";
import { BasePayloadEntity } from "domain/payloads/base.payload.entity";
import { GenrePresenter } from "../presenters/genre.presenter";

export class GenreApiMapper implements ApiMapper<GenreEntity, GenrePresenter, BasePayloadEntity> {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	toEntity(payload: BasePayloadEntity): GenreEntity {
		throw new Error("not implemented");
	}

	toApi(entity: GenreEntity): GenrePresenter {
		const presenter: GenrePresenter = {
			id: entity.id,
			genre: entity.genre
		};

		return presenter;
	}
}
