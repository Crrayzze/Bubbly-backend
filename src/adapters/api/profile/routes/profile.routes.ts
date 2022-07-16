import fp from "fastify-plugin";

import { FastifyReply, FastifyInstance, FastifyPluginAsync, FastifyRequest } from "fastify";
import profileController from "adapters/api/profile/controllers/profile.controller";
import middleware from "adapters/api/authentication/middlewares/authentication.middleware";

import {
	postDescriptionProfileSchema,
	postTagsSchema,
	postOrientationSchema,
	postSearchSchema,
	postPreferenceSchema,
	postGenreSchema,
	postLikeSchema,
	getLikeSchema,
	getProfileSchema,
	postVideoSchema,
	getMatchSchema } from "adapters/api/profile/schemas/profile.schema";
import {
	PostDescriptionProfile,
	PostTags,
	PostOrientation,
	PostGenre,
	PostLike,
	PostSearch,
	PostPreference,
	GetProfileRequest,
	PostVideo } from "adapters/api/profile/requests/profile.request";

// eslint-disable-next-line @typescript-eslint/require-await
const asyncRoutes: FastifyPluginAsync = async (server: FastifyInstance): Promise<void> => {
	const BASE_URL: string = "/api/profile";

	server.route({
		method: "POST",
		url: `${BASE_URL}/description`,
		preValidation: async (req: FastifyRequest, reply: FastifyReply): Promise<void> => await middleware.validAuth(req, reply, server),
		handler: async (req: FastifyRequest<PostDescriptionProfile>, reply: FastifyReply): Promise<void> =>
			await profileController.postDescription(req, reply, server),
		schema: postDescriptionProfileSchema
	});

	server.route({
		method: "POST",
		url: `${BASE_URL}/tags`,
		preValidation: async (req: FastifyRequest, reply: FastifyReply): Promise<void> => await middleware.validAuth(req, reply, server),
		handler: async (req: FastifyRequest<PostTags>, reply: FastifyReply): Promise<void> =>
			await profileController.postTags(req, reply, server),
		schema: postTagsSchema
	});

	server.route({
		method: "POST",
		url: `${BASE_URL}/orientation`,
		preValidation: async (req: FastifyRequest, reply: FastifyReply): Promise<void> => await middleware.validAuth(req, reply, server),
		handler: async (req: FastifyRequest<PostOrientation>, reply: FastifyReply): Promise<void> =>
			await profileController.postOrientation(req, reply, server),
		schema: postOrientationSchema
	});

	server.route({
		method: "POST",
		url: `${BASE_URL}/search`,
		preValidation: async (req: FastifyRequest, reply: FastifyReply): Promise<void> => await middleware.validAuth(req, reply, server),
		handler: async (req: FastifyRequest<PostSearch>, reply: FastifyReply): Promise<void> =>
			await profileController.postSearch(req, reply, server),
		schema: postSearchSchema
	});

	server.route({
		method: "POST",
		url: `${BASE_URL}/preference`,
		preValidation: async (req: FastifyRequest, reply: FastifyReply): Promise<void> => await middleware.validAuth(req, reply, server),
		handler: async (req: FastifyRequest<PostPreference>, reply: FastifyReply): Promise<void> =>
			await profileController.postPreference(req, reply, server),
		schema: postPreferenceSchema
	});

	server.route({
		method: "POST",
		url: `${BASE_URL}/genre`,
		preValidation: async (req: FastifyRequest, reply: FastifyReply): Promise<void> => await middleware.validAuth(req, reply, server),
		handler: async (req: FastifyRequest<PostGenre>, reply: FastifyReply): Promise<void> =>
			await profileController.postGenre(req, reply, server),
		schema: postGenreSchema
	});

	server.route({
		method: "POST",
		url: `${BASE_URL}/like`,
		preValidation: async (req: FastifyRequest, reply: FastifyReply): Promise<void> => await middleware.validAuth(req, reply, server),
		handler: async (req: FastifyRequest<PostLike>, reply: FastifyReply): Promise<void> =>
			await profileController.postLike(req, reply, server),
		schema: postLikeSchema
	});

	server.route({
		method: "POST",
		url: `${BASE_URL}/video`,
		preValidation: async (req: FastifyRequest, reply: FastifyReply): Promise<void> => await middleware.validAuth(req, reply, server),
		handler: async (req: FastifyRequest<PostVideo>, reply: FastifyReply): Promise<void> =>
			await profileController.postVideo(req, reply, server),
		schema: postVideoSchema
	});

	server.route({
		method: "GET",
		url: `${BASE_URL}/like`,
		preValidation: async (req: FastifyRequest, reply: FastifyReply): Promise<void> => await middleware.validAuth(req, reply, server),
		handler: async (req: FastifyRequest<PostLike>, reply: FastifyReply): Promise<void> =>
			await profileController.getLike(req, reply, server),
		schema: getLikeSchema
	});

	server.route({
		method: "GET",
		url: `${BASE_URL}/profile`,
		preValidation: async (req: FastifyRequest, reply: FastifyReply): Promise<void> => await middleware.validAuth(req, reply, server),
		handler: async (req: FastifyRequest<GetProfileRequest>, reply: FastifyReply): Promise<void> =>
			await profileController.getProfile(req, reply, server),
		schema: getProfileSchema
	});

	server.route({
		method: "GET",
		url: `${BASE_URL}/match`,
		preValidation: async (req: FastifyRequest, reply: FastifyReply): Promise<void> => await middleware.validAuth(req, reply, server),
		handler: async (req: FastifyRequest<PostLike>, reply: FastifyReply): Promise<void> =>
			await profileController.getMatch(req, reply, server),
		schema: getMatchSchema
	});
};

export default fp(asyncRoutes);
