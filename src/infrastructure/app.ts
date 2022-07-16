import fastify, { FastifyInstance } from "fastify";
import swagger from "fastify-swagger";
import multipart from "fastify-multipart";
import { Server, IncomingMessage, ServerResponse } from "http";
import fastifyEnv from "fastify-env";
import fastifyCors from "fastify-cors";
import fastifyStatic from "fastify-static";

import path = require("path");
import { swaggerOptions } from "infrastructure/config/swagger";
import { envOptions } from "infrastructure/config/environment";
import db from "infrastructure/spi/db";

import { HttpAuth } from "adapters/spi/shared/utils/httpAuth";
import { SendMailConfig } from "adapters/spi/shared/utils/sendMail";

import repositories from "adapters/spi/shared/repositories";

import errorHandlingRoutes from "adapters/api/errorHandling/routes/errorHandling.routes";
import clientRoutes from "adapters/api/client/routes/client.routes";
import authenticationRoutes from "adapters/api/authentication/routes/authentication.route";
import profileRoutes from "adapters/api/profile/routes/profile.routes";

const env: NodeJS.ProcessEnv = process.env;
const server: FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({ logger: env.NODE_ENV === "test" ? false : true });

void server.register(multipart, {});

//registering swagger before routes
void server.register(swagger, swaggerOptions);

//registering env specific components
server.register(fastifyEnv, envOptions).after((err: Error): void => {
	if (err) {
		console.error(err);
	}

	//security
	void server.register(fastifyCors, { origin: "*" });

	//db
	void server.register(db, server["config"]);

	//httpClient
	const httpClient: HttpAuth = new HttpAuth();
	server.decorate("httpClient", httpClient);

	// sendMailConfig
	server.decorate("sendMailClient", SendMailConfig);

	//repositories
	void server.register(repositories, server["config"]);

	void server.register(fastifyStatic, {
		root: path.join(path.resolve("public")),
		prefix: "/public/"
	});

	//routes
	void server.register(errorHandlingRoutes, server["config"]);

	void server.register(clientRoutes, server["config"]);
	void server.register(authenticationRoutes, server["config"]);
	void server.register(profileRoutes, server["config"]);
});

export default server;
