import { SwaggerOptions } from "fastify-swagger";

export const swaggerOptions: SwaggerOptions = {
	routePrefix: "/documentation",
	exposeRoute: true,
	swagger: {
		info: {
			title: "Bubbly API",
			description: "API to manage user connections etc",
			version: "1.0.0"
		},
		host: "localhost",
		schemes: ["http"],
		consumes: ["application/json"],
		produces: ["application/json"]
	}
};
