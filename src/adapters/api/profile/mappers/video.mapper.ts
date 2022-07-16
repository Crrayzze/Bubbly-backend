import { ApiMapper } from "application/mappers/api.mapper";
import { BasePayloadEntity } from "domain/payloads/base.payload.entity";
import { VideoPresenter } from "../presenters/video.presenter";
import { ProfileVideoEntity } from "domain/entities/profileVideo.entity";

export class ProfileVideoApiMapper implements ApiMapper<ProfileVideoEntity, VideoPresenter, BasePayloadEntity> {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	toEntity(payload: BasePayloadEntity): ProfileVideoEntity {
		throw new Error("not implemented");
	}

	toApi(entity: ProfileVideoEntity): VideoPresenter {
		const presenter: VideoPresenter = {
			id: entity.id,
			publishDate: undefined,
			updateData: undefined,
			url: entity.url
		};

		if (entity.publishDate) {
			presenter.publishDate = entity.publishDate.toDateString();
		}

		if (entity.updateData) {
			presenter.updateData = entity.updateData.toDateString();
		}

		return presenter;
	}
}
