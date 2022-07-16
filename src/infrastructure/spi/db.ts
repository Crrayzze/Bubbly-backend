import fp from "fastify-plugin";
import { FastifyInstance, FastifyPluginAsync } from "fastify";
import "reflect-metadata";
import { Connection, ConnectionOptions, createConnection } from "typeorm";
import * as path from "path";
import { ConfigEnvironment } from "infrastructure/config/environment.interface";

const asyncDb: FastifyPluginAsync<ConfigEnvironment> = async (server: FastifyInstance, opts: ConfigEnvironment): Promise<void> => {
	try {
		const dbConfigOrm: ConnectionOptions = {
			host: opts.DB_HOST,
			database: opts.DB_DATABASE,
			password: opts.DB_PASSWORD,
			port: opts.DB_PORT,
			type: "postgres",
			username: opts.DB_USER,
			entities: [path.join(__dirname, "/../../adapters/spi/db/models/**/*.*s")],
			synchronize: true,
			logging: opts.DB_LOGGING
		};
		const orm: Connection = await createConnection(dbConfigOrm);

		console.log("connected to db");

		server.decorate("orm", orm);
	} catch (err) {
		console.error("error connecting to db");
		console.error(err);
		throw err;
	}
};

export default fp(asyncDb);
