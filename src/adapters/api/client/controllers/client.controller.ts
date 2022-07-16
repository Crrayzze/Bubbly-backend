import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { ErrorHandling } from "adapters/api/errorHandling/utils/errorHandling.utils";
import { GetClientByIdRequest } from "adapters/api/client/requests/client.request";

import { UserPresenter } from "adapters/api/client/presenters/user.presenter";
import { OrientationPresenter } from "adapters/api/client/presenters/orientation.presenter";
import { SearchPresenter } from "adapters/api/client/presenters/search.presenter";
import { TagPresenter } from "adapters/api/client/presenters/tag.presenter";

import { UserApiMapper } from "adapters/api/client/mappers/user.mapper";
import { OrientationApiMapper } from "adapters/api/client/mappers/orientation.mapper";
import { TagApiMapper } from "adapters/api/client/mappers/tag.mapper";
import { SearchApiMapper } from "adapters/api/client/mappers/search.mapper"

import { FetchUserByIdUseCase } from "application/useCases/client/fetchById.user.usecase";
import { FetchAllOrientationUseCase } from "application/useCases/client/fetchAll.orientation.usecase";
import { FetchAllTagsUseCase } from "application/useCases/client/fetchAll.tag.usecase";
import { FetchAllSearchUseCase } from "application/useCases/client/fetchAll.search.usecase";

import { UserEntity } from "domain/entities/user.entity";
import { OrientationEntity } from "domain/entities/orientation.entity";
import { TagEntity } from "domain/entities/tag.entity";
import { AuthenticatedRequestBody } from "adapters/api/authentication/requests/authenticated.request";
import { SearchEntity } from "domain/entities/search.entity";

import { FetchAllGenreUseCase } from "application/useCases/client/fetchAll.genre.usecase";
import { GenreEntity } from "domain/entities/genre.entity";
import { GenreApiMapper } from "../mappers/genre.mapper";
import { GenrePresenter } from "../presenters/genre.presenter";

const getUser = async (req: FastifyRequest<GetClientByIdRequest>, reply: FastifyReply, server: FastifyInstance): Promise<void> => {
	try {
		const fetchUserByIdUseCase: FetchUserByIdUseCase = new FetchUserByIdUseCase(req.query.user_id, server.userRepository);
		const userEntity: UserEntity = await fetchUserByIdUseCase.execute();

		const userApiMapper: UserApiMapper = new UserApiMapper();
		const userPresenter: UserPresenter = userApiMapper.toApi(userEntity);

		void reply.send(userPresenter);
	} catch (err) {
		throw ErrorHandling.createApplicationError(err, "An unknown error occurred while getting the user, please try again");
	}
};

const getTag = async (req: FastifyRequest<AuthenticatedRequestBody>, reply: FastifyReply, server: FastifyInstance): Promise<void> => {
	try {
		const fetchAllTagUseCase: FetchAllTagsUseCase = new FetchAllTagsUseCase(server.tagRepository);
		const tagEntity: TagEntity[] = await fetchAllTagUseCase.execute();



		const tagApiMapper: TagApiMapper = new TagApiMapper();
		const tagPresenters: TagPresenter[] = [];
		for (const entity of tagEntity) {
			tagPresenters.push(tagApiMapper.toApi(entity));
		}
		void reply.send(tagPresenters);

	} catch (err) {
		throw ErrorHandling.createApplicationError(err, "An unknown error occurred while getting tags, please try again");
	}
};


const getOrientation = async (req: FastifyRequest<GetClientByIdRequest>, reply: FastifyReply, server: FastifyInstance): Promise<void> => {
	try {
		const fetchAllOrientationUseCase: FetchAllOrientationUseCase = new FetchAllOrientationUseCase(server.orientationRepository);
		const orientationEntity: OrientationEntity[] = await fetchAllOrientationUseCase.execute();

		const orientationApiMapper: OrientationApiMapper = new OrientationApiMapper();
		const orientationPresenter: OrientationPresenter[] = [];
		
		for (const entity of orientationEntity) {
			orientationPresenter.push(orientationApiMapper.toApi(entity));
		}

		void reply.send(orientationPresenter);

	} catch (err) {
		throw ErrorHandling.createApplicationError(err, "An unknown error occurred while getting orientation, please try again");
	}
};

const getGenre = async (req: FastifyRequest<GetClientByIdRequest>, reply: FastifyReply, server: FastifyInstance): Promise<void> => {
	try {
		const fetchAllGenreUseCase: FetchAllGenreUseCase = new FetchAllGenreUseCase(server.genreRepository);
		const genreEntity: GenreEntity[] = await fetchAllGenreUseCase.execute();
		
		const genreApiMapper: GenreApiMapper = new GenreApiMapper();
		const genrePresenter: GenrePresenter[] = [];
		
		for (const entity of genreEntity) {
			genrePresenter.push(genreApiMapper.toApi(entity));
		}

		void reply.send(genrePresenter);

	} catch (err) {
		throw ErrorHandling.createApplicationError(err, "An unknown error occurred while getting genres, please try again");
	}
};

const getSearch = async (req: FastifyRequest<GetClientByIdRequest>, reply: FastifyReply, server: FastifyInstance): Promise<void> => {
	try {
		const fetchAllSearchUseCase: FetchAllSearchUseCase = new FetchAllSearchUseCase(server.searchRepository);
		const searchEntity: SearchEntity[] = await fetchAllSearchUseCase.execute();
		
		const searchApiMapper: SearchApiMapper = new SearchApiMapper();
		const searchPresenter: SearchPresenter[] = [];
		
		for (const entity of searchEntity) {
			searchPresenter.push(searchApiMapper.toApi(entity));
		}

		void reply.send(searchPresenter);

	} catch (err) {
		throw ErrorHandling.createApplicationError(err, "An unknown error occurred while getting search types, please try again");
	}
};

export default { getUser, getTag, getOrientation, getGenre, getSearch };
