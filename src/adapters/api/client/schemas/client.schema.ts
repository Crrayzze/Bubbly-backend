import { FastifySchema } from "fastify";

export const getUserByIdSchema: FastifySchema = {
	description: "Get user by id",
	tags: ["Client"],
	summary: "Get user by id",
	querystring: {
		user_id: { type: "string" }
	},
	response: {
		200: {
			description: "Successful response",
			type: "object",
			properties: {
				id: { type: "string" },
				email: { type: "string" },
				confirmed: { type: "boolean" }
			}
		},
		400: {
			description: "Application Error",
			type: "object",
			properties: {
				message: { type: "string" }
			}
		},
		401: {
			description: "Authentication failed",
			type: "object",
			properties: {
				message: { type: "string" }
			}
		}
	}
};

export const getTagsSchema: FastifySchema = {
	description: "Get tag\n\nAuthorization required",
	tags: ["Client"],
	summary: "Get tag",
	response: {
		200: {
			description: "Successful response",
			type: "array",
			items: {
				type: "object",
				properties: {
					id: { type: "string" },
					name: { type: "string" }
				}
			}
		},
		400: {
			description: "Application Error",
			type: "object",
			properties: {
				message: { type: "string" }
			}
		},
		401: {
			description: "Authentication failed",
			type: "object",
			properties: {
				message: { type: "string" }
			}
		}
	}
};

export const getOrientationSchema: FastifySchema = {
	description: "Get get orientation",
	tags: ["Client"],
	summary: "Get get orientation",
	response: {
		200: {
			description: "Successful response",
			type: "array",
			items: {
				type: "object",
				properties: {
					id: { type: "string" },
					orientation: { type: "string" }
				}
			}
		},
		400: {
			description: "Application Error",
			type: "object",
			properties: {
				message: { type: "string" }
			}
		},
		401: {
			description: "Authentication failed",
			type: "object",
			properties: {
				message: { type: "string" }
			}
		}
	}
};

export const getGenreSchema: FastifySchema = {
	description: "Get genre",
	tags: ["Client"],
	summary: "Get genre",
	response: {
		200: {
			description: "Successful response",
			type: "object",
			properties: {
				id: { type: "string" },
				genre: { type: "string" }
			}
		},
		400: {
			description: "Application Error",
			type: "object",
			properties: {
				message: { type: "string" }
			}
		},
		401: {
			description: "Authentication failed",
			type: "object",
			properties: {
				message: { type: "string" }
			}
		}
	}
};

export const getSearchSchema: FastifySchema = {
	description: "Get get search",
	tags: ["Client", "User"],
	summary: "Get get search",
	response: {
		200: {
			description: "Successful response",
			type: "object",
			properties: {
				id: { type: "string" },
				search: { type: "string" }
			}
		},
		400: {
			description: "Application Error",
			type: "object",
			properties: {
				message: { type: "string" }
			}
		},
		401: {
			description: "Authentication failed",
			type: "object",
			properties: {
				message: { type: "string" }
			}
		}
	}
};
