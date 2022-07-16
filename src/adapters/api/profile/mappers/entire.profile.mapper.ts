import { ApiMapper } from "application/mappers/api.mapper";
import { ProfileDataEntity } from "domain/entities/profileData.entity";
import { EntireProfilePresenter } from "../presenters/entireProfile.presenter";
import { BasePayloadEntity } from "domain/payloads/base.payload.entity";
import { OrientationApiMapper } from "adapters/api/client/mappers/orientation.mapper";
import { GenreApiMapper } from "adapters/api/client/mappers/genre.mapper";
import { SearchApiMapper } from "adapters/api/client/mappers/search.mapper";
import { PreferenceApiMapper } from "./preference.mapper";
import { TagApiMapper } from "adapters/api/client/mappers/tag.mapper";
import { ProfileVideoApiMapper } from "./video.mapper";

export class GetEntireProfileApiMapper implements ApiMapper<ProfileDataEntity, EntireProfilePresenter, BasePayloadEntity> {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	toEntity(payload: BasePayloadEntity): ProfileDataEntity {
		throw new Error("not implemented");
	}

  	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	toApi(entity: ProfileDataEntity): EntireProfilePresenter {
		const presenter: EntireProfilePresenter = {
			id: entity.id,
			firstName: entity.firstName,
			lastName: entity.lastName,
			phoneNbr: entity.phoneNbr,
			birthday:  entity.birthday,
			description: entity.description,
			orientation: undefined,
			genre: undefined,
			search: undefined,
			preference: undefined,
			tags: [],
			videos: []
		};

		const orientationMapper: OrientationApiMapper = new OrientationApiMapper();
		if (entity.orientation) {
			presenter.orientation = orientationMapper.toApi(entity.orientation);
		}

		const genreMapper: GenreApiMapper = new GenreApiMapper();
		if (entity.genre) {
			presenter.genre = genreMapper.toApi(entity.genre);
		}

		const searchMapper: SearchApiMapper = new SearchApiMapper();
		if (entity.search) {
			presenter.search = searchMapper.toApi(entity.search);
		}

		const preferenceMapper: PreferenceApiMapper = new PreferenceApiMapper();
		if (entity.preference) {
			presenter.preference = preferenceMapper.toApi(entity.preference);
		}

		const tagMapper: TagApiMapper = new TagApiMapper();
		if (entity.tags) {
			for (const tag of entity.tags) {
				presenter.tags.push(tagMapper.toApi(tag));
			}
		}

		const videoMapper: ProfileVideoApiMapper = new ProfileVideoApiMapper();
		if (entity.videos) {
			for (const video of entity.videos) {
				presenter.videos.push(videoMapper.toApi(video));
			}
		}

		return presenter;
	}
}
