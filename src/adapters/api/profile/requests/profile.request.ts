import { AuthenticatedRequestBody } from "adapters/api/authentication/requests/authenticated.request";

import { UserEntity } from "domain/entities/user.entity";

export interface PostDescriptionProfile extends AuthenticatedRequestBody {
	Body: {
		authUser: UserEntity;
		description: string;
	};
}

export interface PostTags extends AuthenticatedRequestBody {
	Body: {
		authUser: UserEntity;
		tags_id: string[];
	};
}

export interface PostOrientation extends AuthenticatedRequestBody {
	Body: {
		authUser: UserEntity;
		orientation_id: string;
	};
}

export interface PostSearch extends AuthenticatedRequestBody {
	Body: {
		authUser: UserEntity;
		search_id: string;
	};
}

export interface PostPreference extends AuthenticatedRequestBody {
	Body: {
		authUser: UserEntity;
		age_minimum: number;
		age_maximum: number;
	};
}

export interface PostGenre extends AuthenticatedRequestBody {
	Body: {
		authUser: UserEntity;
		genre_id: string;
	};
}

export interface PostLike extends AuthenticatedRequestBody {
	Body: {
		authUser: UserEntity;
		profile_id: string;
	};
}

export interface GetProfileRequest extends AuthenticatedRequestBody {
	Querystring: {
		authUser: UserEntity;
		profile_id: string;
	};
}

export interface PostVideo extends AuthenticatedRequestBody {
	Body: {
		authUser: UserEntity;
	};
}

