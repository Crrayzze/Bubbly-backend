import fp from "fastify-plugin";

import { FastifyReply, FastifyInstance, FastifyPluginAsync, FastifyRequest } from "fastify";
import clientController from "adapters/api/client/controllers/client.controller";
import middleware from "adapters/api/authentication/middlewares/authentication.middleware";
import { getUserByIdSchema, getTagsSchema, getOrientationSchema, getGenreSchema, getSearchSchema } from "adapters/api/client/schemas/client.schema";
import { GetClientByIdRequest } from "adapters/api/client/requests/client.request";
import { AuthenticatedRequestBody } from "adapters/api/authentication/requests/authenticated.request";

// eslint-disable-next-line @typescript-eslint/require-await
const asyncRoutes: FastifyPluginAsync = async (server: FastifyInstance): Promise<void> => {
	const BASE_URL: string = "/api/client";

	server.route({
		method: "GET",
		url: `${BASE_URL}/users`,
		handler: async (req: FastifyRequest<GetClientByIdRequest>, reply: FastifyReply): Promise<void> => await clientController.getUser(req, reply, server),
		schema: getUserByIdSchema
	});

	server.route({
		method: "GET",
		url: `${BASE_URL}/tags`,
		preValidation: async (req: FastifyRequest, reply: FastifyReply): Promise<void> => await middleware.validAuth(req, reply, server),
		handler: async (req: FastifyRequest<AuthenticatedRequestBody>, reply: FastifyReply): Promise<void> => await clientController.getTag(req, reply, server),
		schema: getTagsSchema
	});

	server.route({
		method: "GET",
		url: `${BASE_URL}/orientation`,
		// TODO middleware to check if the user is authenticated
		//		preValidation: async (req: FastifyRequest, reply: FastifyReply): Promise<void> => await middleware.validAuth(req, reply, server),
		handler: async (req: FastifyRequest<GetClientByIdRequest>, reply: FastifyReply): Promise<void> => await clientController.getOrientation(req, reply, server),
		schema: getOrientationSchema
	});

	server.route({
		method: "GET",
		url: `${BASE_URL}/genre`,
		// TODO middleware to check if the user is authenticated
		//		preValidation: async (req: FastifyRequest, reply: FastifyReply): Promise<void> => await middleware.validAuth(req, reply, server),
		handler: async (req: FastifyRequest<GetClientByIdRequest>, reply: FastifyReply): Promise<void> => await clientController.getGenre(req, reply, server),
		schema: getGenreSchema
	});

	server.route({
		method: "GET",
		url: `${BASE_URL}/search`,
		handler: async (req: FastifyRequest<GetClientByIdRequest>, reply: FastifyReply): Promise<void> => await clientController.getSearch(req, reply, server),
		schema: getSearchSchema
	});
};

export default fp(asyncRoutes);
