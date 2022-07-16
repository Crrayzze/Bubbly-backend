import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { ErrorHandling } from "adapters/api/errorHandling/utils/errorHandling.utils";
import { PostDescriptionProfile, PostTags, PostOrientation, PostSearch, PostPreference, PostGenre, PostLike, GetProfileRequest, PostVideo } from "adapters/api/profile/requests/profile.request";
import { ProfileDataEntity } from "domain/entities/profileData.entity";
import { GenericResponseEntity } from "domain/entities/genericResponse.entity";
import { TagEntity } from "domain/entities/tag.entity";

import { UpdateDescriptionProfileUseCase } from "application/useCases/profile/updateDescription.profile.usecase";

import { GenericResponseApiMapper } from "adapters/api/profile/mappers/genericResponse.profile.mapper";
import { GenericResponsePresenter } from "adapters/api/authentication/presenters/genericResponse.authentication.presenter";
import { FetchTagByIdUseCase } from "application/useCases/client/fetchById.tag.usecase";
import { DeleteTagUseCase } from "application/useCases/profile/delete.tag.usecase";
import { CreateTagProfileRelationUseCase } from "application/useCases/profile/create.profileTage.usecase";
import { OrientationEntity } from "domain/entities/orientation.entity";
import { SearchEntity } from "domain/entities/search.entity";
import { PreferenceEntity } from "domain/entities/preference.entity";
import { GetOrientationByIdUseCase } from "application/useCases/profile/getById.orientation.usecase";
import { GetSearchByIdUseCase } from "application/useCases/profile/getById.search.usecase";
import { GetPreferenceByIdUseCase } from "application/useCases/profile/getById.preference.usecase";
import { UpdateProfileUseCase } from "application/useCases/profile/update.profile.usecase";
import { UpdatePreferenceUseCase } from "application/useCases/profile/update.preference.usecase";
import { GetGenreByIdUseCase } from "application/useCases/profile/getById.genre.usecase";
import { GenreEntity } from "domain/entities/genre.entity";
import { GetProfileByIdUseCase } from "application/useCases/profile/getById.profile.usecase";
import { CreateLikeUseCase } from "application/useCases/profile/create.like.usecase";
import { GetLikeByUserIdUseCase } from "application/useCases/profile/getByUserId.like.usecase";
import { LikeEntity } from "domain/entities/like.entity";
import { SaveLikeUseCase } from "application/useCases/profile/save.like.usecase";
import { GetLikeToUseCase } from "application/useCases/profile/getTo.like.usecase";
import { GetLikeApiMapper } from "../mappers/getLike.mapper";
import { GetLikePresenter } from "../presenters/getLike.presenter";
import { PostVideoUseCase } from "application/useCases/profile/post.video.usecase";
import { Multipart, MultipartFile } from "fastify-multipart";
import { GetEntireProfileByIdUseCase } from "application/useCases/profile/getEntireById.profile.usecase";
import { EntireProfilePresenter } from "../presenters/entireProfile.presenter";
import { GetEntireProfileApiMapper } from "../mappers/entire.profile.mapper";
import { GetMatchUseCase } from "application/useCases/profile/get.match.usecase";

const postDescription = async (req: FastifyRequest<PostDescriptionProfile>, reply: FastifyReply, server: FastifyInstance): Promise<void> => {
	try {
		const newProfileDataEntity: ProfileDataEntity = req.body.authUser.profileData;
		newProfileDataEntity.description = req.body.description;

		const updateDescriptionProfileUseCase: UpdateDescriptionProfileUseCase = new UpdateDescriptionProfileUseCase(newProfileDataEntity, server.profileDataRepository);
		const response: GenericResponseEntity = await updateDescriptionProfileUseCase.execute();

		const genericResponseApiMapper: GenericResponseApiMapper = new GenericResponseApiMapper();
		const responsePresenter: GenericResponsePresenter = genericResponseApiMapper.toApi(response);

		void reply.send(responsePresenter);
        
	} catch (err) {
		throw ErrorHandling.createApplicationError(err, "An unknown error occurred while updating the user's description, please try again");
	}
};

const postTags = async (req: FastifyRequest<PostTags>, reply: FastifyReply, server: FastifyInstance): Promise<void> => {
	try {
		const tagsEntity: TagEntity[] = [];

		for (const tag of req.body.tags_id) {
			const getTagById: FetchTagByIdUseCase = new FetchTagByIdUseCase(server.tagRepository, tag);
			tagsEntity.push(await getTagById.execute());
		}

		const removeTag: DeleteTagUseCase = new DeleteTagUseCase(req.body.authUser.id, server.usersTagRepository);
		await removeTag.execute();

		for (const tag of tagsEntity) {
			const createTagProfileRelationUseCase: CreateTagProfileRelationUseCase = new CreateTagProfileRelationUseCase(req.body.authUser.profileData, tag, server.usersTagRepository);
			await createTagProfileRelationUseCase.execute();
		}
		
		void reply.send({ message: "Tag well defined" });
        
	} catch (err) {
		throw ErrorHandling.createApplicationError(err, "An unknown error occurred while updating the user's tag, please try again");
	}
};

const postOrientation = async (req: FastifyRequest<PostOrientation>, reply: FastifyReply, server: FastifyInstance): Promise<void> => {
	try {
		const profileDataEntity: ProfileDataEntity = req.body.authUser.profileData;

		const getOrientationByIdUseCase: GetOrientationByIdUseCase = new GetOrientationByIdUseCase(server.orientationRepository, req.body.orientation_id);
		const orientationEnity: OrientationEntity = await getOrientationByIdUseCase.execute();

		profileDataEntity.orientation = orientationEnity;
		
		const updateProfileUseCase: UpdateProfileUseCase = new UpdateProfileUseCase(profileDataEntity, server.profileDataRepository);
		await updateProfileUseCase.execute();

		void reply.send({ message: "Orientation well defined" });
        
	} catch (err) {
		throw ErrorHandling.createApplicationError(err, "An unknown error occurred while updating the user's orientation, please try again");
	}
};

const postSearch = async (req: FastifyRequest<PostSearch>, reply: FastifyReply, server: FastifyInstance): Promise<void> => {
	try {
		const profileDataEntity: ProfileDataEntity = req.body.authUser.profileData;

		const getSearchByIdUseCase: GetSearchByIdUseCase = new GetSearchByIdUseCase(server.searchRepository, req.body.search_id);
		const searchEntity: SearchEntity = await getSearchByIdUseCase.execute();

		profileDataEntity.search = searchEntity;
		
		const updateProfileUseCase: UpdateProfileUseCase = new UpdateProfileUseCase(profileDataEntity, server.profileDataRepository);
		await updateProfileUseCase.execute();

		void reply.send({ message: "Search type well defined" });
        
	} catch (err) {
		throw ErrorHandling.createApplicationError(err, "An unknown error occurred while updating the user's search type, please try again");
	}
};

const postPreference = async (req: FastifyRequest<PostPreference>, reply: FastifyReply, server: FastifyInstance): Promise<void> => {
	try {
		const profileDataEntity: ProfileDataEntity = req.body.authUser.profileData;

		const getPreferenceByIdUseCase: GetPreferenceByIdUseCase = new GetPreferenceByIdUseCase(server.preferenceRepository, req.body.authUser.profileData.preference.id);
		const preferenceEntity: PreferenceEntity = await getPreferenceByIdUseCase.execute();
		//update la pour modifier la table preference
		preferenceEntity.age_minimum = req.body.age_minimum;
		preferenceEntity.age_maximum = req.body.age_maximum;
		const updatePreferenceUseCase: UpdatePreferenceUseCase = new UpdatePreferenceUseCase(preferenceEntity, server.preferenceRepository);
		await updatePreferenceUseCase.execute();

		void reply.send({ message: "Preference well defined" });
        
	} catch (err) {
		throw ErrorHandling.createApplicationError(err, "An unknown error occurred while updating the user's preference, please try again");
	}
};

const postGenre = async (req: FastifyRequest<PostGenre>, reply: FastifyReply, server: FastifyInstance): Promise<void> => {
	try {
		const profileDataEntity: ProfileDataEntity = req.body.authUser.profileData;

		const getGenreByIdUseCase: GetGenreByIdUseCase = new GetGenreByIdUseCase(server.genreRepository, req.body.genre_id);
		const genreEntity: GenreEntity = await getGenreByIdUseCase.execute();

		profileDataEntity.genre = genreEntity;
		
		const updateProfileUseCase: UpdateProfileUseCase = new UpdateProfileUseCase(profileDataEntity, server.profileDataRepository);
		await updateProfileUseCase.execute();

		void reply.send({ message: "Gender well defined" });
        
	} catch (err) {
		throw ErrorHandling.createApplicationError(err, "An unknown error occurred while updating the user's gender, please try again");
	}
};


const postLike = async (req: FastifyRequest<PostLike>, reply: FastifyReply, server: FastifyInstance): Promise<void> => {
	try {
		// get the profile of the connected user
		const profileDataEntityLikeFrom: ProfileDataEntity = req.body.authUser.profileData;

		const getProfileByIdUseCase: GetProfileByIdUseCase = new GetProfileByIdUseCase(server.profileDataRepository, req.body.profile_id);
		const profileDataEntityLikeTo: ProfileDataEntity =  await getProfileByIdUseCase.execute();

		// Verify if the profile is already liked
		const getLikeByUserIdUseCase: GetLikeByUserIdUseCase = new GetLikeByUserIdUseCase(server.likeRepository, profileDataEntityLikeTo, profileDataEntityLikeFrom);
		const likeEntity: LikeEntity = await getLikeByUserIdUseCase.execute();
		if (likeEntity) {
			// if (true) -> Verify if already matched
			if (likeEntity.matched) {
				// if (true) -> send actual status (already matched)
				throw ErrorHandling.createApplicationError(new Error(), "Profile already matched");
			}
			else {
				// else -> send actual status (already liked)
				throw ErrorHandling.createApplicationError(new Error(), "Profile already liked");
			}
		}	

		// Create the relation like/lliked
		const createLikeUseCase: CreateLikeUseCase = new CreateLikeUseCase(profileDataEntityLikeFrom, profileDataEntityLikeTo, server.likeRepository);
		const newLikeEntity: LikeEntity = await createLikeUseCase.execute();

		// Verify if they both liked eachothers
		const checkIfAlreadyLikedByTheOther: GetLikeByUserIdUseCase = new GetLikeByUserIdUseCase(server.likeRepository, newLikeEntity.from, newLikeEntity.to);
		const secondUserLikeEntity: LikeEntity = await checkIfAlreadyLikedByTheOther.execute();
		
		// if yes -> create a match between them
		if (newLikeEntity && secondUserLikeEntity) {
			newLikeEntity.matched = true;
			secondUserLikeEntity.matched = true;

			const newSaveLikeUseCase: SaveLikeUseCase = new SaveLikeUseCase(server.likeRepository, newLikeEntity);
			await newSaveLikeUseCase.execute();

			const secondUserSaveLikeUseCase: SaveLikeUseCase = new SaveLikeUseCase(server.likeRepository, secondUserLikeEntity);
			await secondUserSaveLikeUseCase.execute();
		}

		void reply.send({ message: "Profile liked", match: newLikeEntity.matched });

	} catch (err) {
		throw ErrorHandling.createApplicationError(err, "An unknown error occurred while liking the user's profile, please try again");
	}
};

const getLike = async (req: FastifyRequest<PostLike>, reply: FastifyReply, server: FastifyInstance): Promise<void> => {
	try {
		// get the profile of the connected user
		const connectedUserProfileData: ProfileDataEntity = req.body.authUser.profileData;

		// get all like to the connected user (exclude match)
		const getLikeToUseCase: GetLikeToUseCase = new GetLikeToUseCase(server.likeRepository, connectedUserProfileData);
		const likeEntities: LikeEntity[] = await getLikeToUseCase.execute();

		// presenters to send back with user_id and update_date
		const getLikePresenters: GetLikePresenter[] = [];
		const getLikeApiMapper: GetLikeApiMapper =  new GetLikeApiMapper();

		for (const entity of likeEntities) {
			getLikePresenters.push(getLikeApiMapper.toApi(entity));
		}
		void reply.send(getLikePresenters);

	} catch (err) {
		throw ErrorHandling.createApplicationError(err, "An unknown error occurred while liking the user's profile, please try again");
	}
};


const getProfile = async (req: FastifyRequest<GetProfileRequest>, reply: FastifyReply, server: FastifyInstance): Promise<void> => {
	try {
		const getEntireProfileByIdUseCase: GetEntireProfileByIdUseCase = new GetEntireProfileByIdUseCase(
			req.query.profile_id,
			server.profileDataRepository,
			server.usersTagRepository,
			server.videoRepository
		);
		const profileDataEntity: ProfileDataEntity = await getEntireProfileByIdUseCase.execute();

		// Presenter & mapper
		const getEntireProfileApiMapper: GetEntireProfileApiMapper = new GetEntireProfileApiMapper();
		
		const entireProfilePresenter: EntireProfilePresenter = getEntireProfileApiMapper.toApi(profileDataEntity);

		void reply.send(entireProfilePresenter);
		// 
	} catch (err) {
		throw ErrorHandling.createApplicationError(err, "An unknown error occurred while getting the user's profile, please try again");
	}
};

const postVideo = async (req: FastifyRequest<PostVideo>, reply: FastifyReply, server: FastifyInstance): Promise<void> => {
	try {
		// Récupérer le profil de l'utilisateur connecté (celui qui fait le call)
		const profileDataEntity: ProfileDataEntity = req.body.authUser.profileData;
		const file: Multipart = await req.file();
        
		const postVideoUseCase: PostVideoUseCase = new PostVideoUseCase(server.videoRepository, server.loadVideoRepository, file, profileDataEntity);
		const response: GenericResponseEntity = await postVideoUseCase.execute();

		void reply.send(response);
        
	} catch (err) {
		throw ErrorHandling.createApplicationError(err, "An unknown error occurred while uploading a new video, please try again");
	}
};

const getMatch = async (req: FastifyRequest<PostLike>, reply: FastifyReply, server: FastifyInstance): Promise<void> => {
	try {
		// get the profile of the connected user
		const connectedUserProfileData: ProfileDataEntity = req.body.authUser.profileData;

		// get all match to the connected user
		const getMatchUseCase: GetMatchUseCase = new GetMatchUseCase(server.likeRepository, connectedUserProfileData);
		const likeEntities: LikeEntity[] = await getMatchUseCase.execute();

		// presenters to send back with user_id and update_date
		const getLikePresenters: GetLikePresenter[] = [];
		const getLikeApiMapper: GetLikeApiMapper =  new GetLikeApiMapper();

		for (const entity of likeEntities) {
			getLikePresenters.push(getLikeApiMapper.toApi(entity));
		}
		void reply.send(getLikePresenters);

	} catch (err) {
		throw ErrorHandling.createApplicationError(err, "An unknown error occurred while getting match, please try again");
	}
};

export default { postDescription, postTags, postOrientation, postSearch, postPreference, postGenre, postLike, getLike, getProfile, postVideo, getMatch };
