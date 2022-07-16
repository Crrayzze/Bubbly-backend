import fp from "fastify-plugin";

import { FastifyReply, FastifyInstance, FastifyPluginAsync, FastifyRequest } from "fastify";
import middleware from "adapters/api/authentication/middlewares/authentication.middleware";
// eslint-disable-next-line max-len
import { postRegisterAuthSchema, postLoginAuthSchema, postResendAuthSchema, postChangePasswordAuthSchema, postChangeEmailAuthSchema, postVerifEmailAuthSchema, postRecoveryPwdSendCodeAuthSchema, postRecoveryPwdChangePwdAuthSchema, postDelAccountAuthSchema, getPingSchema } from "adapters/api/authentication/schemas/authentication.schema";
// eslint-disable-next-line max-len
import { PostRegisterAuthenticationRequest, PostLoginAuthenticationRequest, PostResendAuthenticationRequest, PostChangePasswordAuthenticationRequest, PostChangeEmailAuthenticationRequest, PostVerifyEmailAuthenticationRequest, PostRecoveryPwdSendCodeAuthenticationRequest, PostRecoveryPwdChangePwdAuthenticationRequest, PostDeleteAuthenticationRequest } from "adapters/api/authentication/requests/authentication.request";

import authenticationController from "adapters/api/authentication/controllers/authentication.controller";

// eslint-disable-next-line @typescript-eslint/require-await
const asyncRoutes: FastifyPluginAsync = async (server: FastifyInstance): Promise<void> => {
	const BASE_URL: string = "/api/authentication";

	server.route({
		method: "POST",
		url: `${BASE_URL}/register`,
		handler: async (req: FastifyRequest<PostRegisterAuthenticationRequest>, reply: FastifyReply): Promise<void> => 
			await authenticationController.postRegisterAuthentication(req, reply, server),
		schema: postRegisterAuthSchema
	});

	server.route({
		method: "POST",
		url: `${BASE_URL}/delete`,
		preValidation: async (req: FastifyRequest, reply: FastifyReply): Promise<void> => await middleware.validAuth(req, reply, server),
		handler: async (req: FastifyRequest<PostDeleteAuthenticationRequest>, reply: FastifyReply): Promise<void> =>
			await authenticationController.postDeleteAuthentication(req, reply, server),
		schema: postDelAccountAuthSchema
	});

	server.route({
		method: "POST",
		url: `${BASE_URL}/resendmail`,
		handler: async (req: FastifyRequest<PostResendAuthenticationRequest>, reply: FastifyReply): Promise<void> => 
			await authenticationController.postResendAuthentication(req, reply, server),
		schema: postResendAuthSchema
	});

	server.route({
		method: "POST",
		url: `${BASE_URL}/login`,
		handler: async (req: FastifyRequest<PostLoginAuthenticationRequest>, reply: FastifyReply): Promise<void> => 
			await authenticationController.postLoginAuthentication(req, reply, server),
		schema: postLoginAuthSchema
	});

	server.route({
		method: "POST",
		url: `${BASE_URL}/changepassword`,
		handler: async (req: FastifyRequest<PostChangePasswordAuthenticationRequest>, reply: FastifyReply): Promise<void> => 
			await authenticationController.postChangePasswordAuthentication(req, reply, server),
		schema: postChangePasswordAuthSchema
	});

	server.route({
		method: "POST",
		url: `${BASE_URL}/changeemail`,
		preValidation: async (req: FastifyRequest, reply: FastifyReply): Promise<void> => await middleware.validAuth(req, reply, server),
		handler: async (req: FastifyRequest<PostChangeEmailAuthenticationRequest>, reply: FastifyReply): Promise<void> =>
			await authenticationController.postChangeEmailAuthentication(req, reply, server),
		schema: postChangeEmailAuthSchema
	});

	server.route({
		method: "POST",
		url: `${BASE_URL}/verifyemail`,
		handler: async (req: FastifyRequest<PostVerifyEmailAuthenticationRequest>, reply: FastifyReply): Promise<void> =>
			await authenticationController.postVerifyEmailAuthentication(req, reply, server),
		schema: postVerifEmailAuthSchema
	});

	server.route({
		method: "POST",
		url: `${BASE_URL}/recoverypwd/sendcode`,
		handler: async (req: FastifyRequest<PostRecoveryPwdSendCodeAuthenticationRequest>, reply: FastifyReply): Promise<void> =>
			await authenticationController.postRecoveryPwdSendCodeAuthentication(req, reply, server),
		schema: postRecoveryPwdSendCodeAuthSchema
	});

	server.route({
		method: "POST",
		url: `${BASE_URL}/recoverypwd/changepwd`,
		handler: async (req: FastifyRequest<PostRecoveryPwdChangePwdAuthenticationRequest>, reply: FastifyReply): Promise<void> =>
			await authenticationController.postRecoveryPwdChangePwdAuthentication(req, reply, server),
		schema: postRecoveryPwdChangePwdAuthSchema
	});

	server.route({
		method: "GET",
		url: "/api/ping",
		handler: async (req: FastifyRequest<PostRecoveryPwdChangePwdAuthenticationRequest>, reply: FastifyReply): Promise<void> =>
			await authenticationController.getPing(req, reply, server),
		schema: getPingSchema
	});

};

export default fp(asyncRoutes);
