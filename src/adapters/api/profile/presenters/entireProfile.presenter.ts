import { GenrePresenter } from "adapters/api/client/presenters/genre.presenter";
import { OrientationPresenter } from "adapters/api/client/presenters/orientation.presenter";
import { SearchPresenter } from "adapters/api/client/presenters/search.presenter";
import { TagPresenter } from "adapters/api/client/presenters/tag.presenter";
import { BasePresenter } from "domain/presenters/base.presenter";
import { PreferencePresenter } from "./preference.presenter";
import { VideoPresenter } from "./video.presenter";

export interface EntireProfilePresenter extends BasePresenter {
	firstName: string;
	lastName: string;
	phoneNbr: string;
	birthday: string;
	description: string;
	orientation: OrientationPresenter;
	genre: GenrePresenter;
	search: SearchPresenter;
	preference: PreferencePresenter;
	tags: TagPresenter[];
	videos: VideoPresenter[];
}
