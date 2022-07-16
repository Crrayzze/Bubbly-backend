// eslint-disable-next-line @typescript-eslint/no-explicit-any
const schema: any = {
	type: "object",
	required: [
		"DB_USER",
		"DB_HOST",
		"DB_PASSWORD",
		"DB_DATABASE",
		"DB_PORT"
	],
	properties: {
		DB_USER: {
			type: "string",
			default: ""
		},
		DB_HOST: {
			type: "string",
			default: ""
		},
		DB_PASSWORD: {
			type: "string",
			default: ""
		},
		DB_DATABASE: {
			type: "string",
			default: ""
		},
		DB_PORT: {
			type: "number",
			default: 3000
		},
		DB_LOGGING: {
			type: "boolean",
			default: false
		}
	}
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const envOptions: any = {
	schema,
	dotenv: {
		path: `.env.${process.env.NODE_ENV}`
	}
};
