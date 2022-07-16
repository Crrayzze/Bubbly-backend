import { ApiMapper } from "application/mappers/api.mapper";
import { ProfileDataEntity } from "domain/entities/profileData.entity";
import { ProfileDescriptionPayload } from "adapters/api/profile/payloads/profile.payload";
import { BasePresenter } from "domain/presenters/base.presenter";

export class ProfileDescriptionApiMapper implements ApiMapper<ProfileDataEntity, BasePresenter, ProfileDescriptionPayload> {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	toEntity(payload: ProfileDescriptionPayload): ProfileDataEntity {
		const entity: ProfileDataEntity = {
			description: payload.description,
			birthday: undefined,
			firstName: undefined,
			lastName: undefined,
			phoneNbr: undefined,
			tags: []
		};
		return entity;
	}

  	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	toApi(entity: ProfileDataEntity): BasePresenter {
		throw new Error("not implemented");
	}
}
