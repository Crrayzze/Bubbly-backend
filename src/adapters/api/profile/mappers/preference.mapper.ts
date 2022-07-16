import { ApiMapper } from "application/mappers/api.mapper";
import { PreferenceEntity } from "domain/entities/preference.entity";
import { BasePayloadEntity } from "domain/payloads/base.payload.entity";
import { PreferencePresenter } from "../presenters/preference.presenter";

export class PreferenceApiMapper implements ApiMapper<PreferenceEntity, PreferencePresenter, BasePayloadEntity> {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	toEntity(payload: BasePayloadEntity): PreferenceEntity {
		throw new Error("not implemented");
	}

	toApi(entity: PreferenceEntity): PreferencePresenter {
		const presenter: PreferencePresenter = {
			id: entity.id,
			age_minimum: entity.age_minimum,
			age_maximum: entity.age_maximum
		};

		return presenter;
	}
}
