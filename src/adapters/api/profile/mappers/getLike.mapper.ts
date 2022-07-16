import { ApiMapper } from "application/mappers/api.mapper";
import { ProfileDescriptionPayload } from "adapters/api/profile/payloads/profile.payload";
import { LikeEntity } from "domain/entities/like.entity";
import { GetLikePresenter } from "../presenters/getLike.presenter";

export class GetLikeApiMapper implements ApiMapper<LikeEntity, GetLikePresenter, ProfileDescriptionPayload> {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	toEntity(payload: ProfileDescriptionPayload): LikeEntity {
		throw new Error("not implemented");
	}

  	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	toApi(entity: LikeEntity): GetLikePresenter {
		const presenter: GetLikePresenter = {
			user_id: entity.from.id,
			udapte_date: entity.updateData.toDateString()
		};

		return presenter;
	}
}
