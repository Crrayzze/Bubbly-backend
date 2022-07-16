import fp from "fastify-plugin";

import { FastifyReply, FastifyInstance, FastifyPluginAsync, FastifyRequest } from "fastify";

// eslint-disable-next-line @typescript-eslint/require-await
const asyncRoutes: FastifyPluginAsync = async (server: FastifyInstance): Promise<void> => {
	server.setErrorHandler((error: Error, request: FastifyRequest, reply: FastifyReply) => {
		void reply.send(JSON.stringify(error));
	});
};

export default fp(asyncRoutes);
