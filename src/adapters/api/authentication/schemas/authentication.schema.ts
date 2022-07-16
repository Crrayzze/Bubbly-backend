import { FastifySchema } from "fastify";

export const postRegisterAuthSchema: FastifySchema = {
	description: "Function to register an user\nBirthday should be format \"YYYY/MM/DD\"",
	tags: ["Authentication"],
	summary: "Sends a login and password to create a new user",
	body: {
		type: "object",
		required: ["email", "password", "birthday"],
		properties: {
			email: { type: "string" },
			password: { type: "string" },
			birthday: { type: "string" }
		}
	},
	response: {
		200: {
			description: "Successful response",
			type: "object",
			properties: {
				message: { type: "string" }
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
			type: "object"
		}
	}
};

export const postDelAccountAuthSchema: FastifySchema = {
	description: "Function to delete an user\n\nAuthorization required",
	tags: ["Authentication"],
	summary: "Sends a login to delete the account",
	body: {
		type: "object",
		required: ["email"],
		properties: {
			email: { type: "string" }
		}
	},
	response: {
		200: {
			description: "Successful response",
			type: "object",
			properties: {
				message: { type: "string" }
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
			type: "object"
		}
	}
};

export const postResendAuthSchema: FastifySchema = {
	description: "Function to resend verification mail to the user ",
	tags: ["Authentication"],
	summary: "Sends a login and password to create a new user",
	body: {
		type: "object",
		required: ["email"],
		properties: {
			email: { type: "string" }
		}
	},
	response: {
		200: {
			description: "Successful response",
			type: "object",
			properties: {
				message: { type: "string" }
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
			type: "object"
		}
	}
};

export const postLoginAuthSchema: FastifySchema = {
	description: "Function to login an user ",
	tags: ["Authentication"],
	summary: "Sends a login and password to login",
	body: {
		type: "object",
		required: ["email", "password"],
		properties: {
			email: { type: "string" },
			password: { type: "string" }
		}
	},
	response: {
		200: {
			description: "Successful response",
			type: "object",
			properties: {
				message: { type: "string" },
				token: { type: "string" }
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
			type: "object"
		}
	}
};

export const postChangePasswordAuthSchema: FastifySchema = {
	description: "Function to change user password",
	tags: ["Authentication"],
	summary: "Sends a login and password to change password",
	body: {
		type: "object",
		required: ["email", "password"],
		properties: {
			email: { type: "string" },
			password: { type: "string" }
		}
	},
	response: {
		200: {
			description: "Successful response",
			type: "object",
			properties: {
				message: { type: "string" }
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
			type: "object"
		}
	}
};

export const postChangeEmailAuthSchema: FastifySchema = {
	description: "Function to change user email\n\nAuthorization required",
	tags: ["Authentication"],
	summary: "Sends a old and new email to change user email",
	body: {
		type: "object",
		required: ["oldEmail", "email"],
		properties: {
			oldEmail: { type: "string" },
			email: { type: "string" }
		}
	},
	response: {
		200: {
			description: "Successful response",
			type: "object",
			properties: {
				message: { type: "string" }
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
			type: "object"
		}
	}
};

export const postVerifEmailAuthSchema: FastifySchema = {
	description: "Function to verify the user email account",
	tags: ["Authentication"],
	summary: "Sends a email and the code to verify the account",
	body: {
		type: "object",
		required: ["email", "code"],
		properties: {
			email: { type: "string" },
			code: { type: "string" }
		}
	},
	response: {
		200: {
			description: "Successful response",
			type: "object",
			properties: {
				message: { type: "string" }
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
			type: "object"
		}
	}
};

export const postRecoveryPwdSendCodeAuthSchema: FastifySchema = {
	description: "Function to send a code for the recovering of the user password",
	tags: ["Authentication"],
	summary: "Sends a email and the code to recover the password",
	body: {
		type: "object",
		required: ["email"],
		properties: {
			email: { type: "string" }
		}
	},
	response: {
		200: {
			description: "Successful response",
			type: "object",
			properties: {
				message: { type: "string" }
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
			type: "object"
		}
	}
};

export const postRecoveryPwdChangePwdAuthSchema: FastifySchema = {
	description: "Function to change user password",
	tags: ["Authentication"],
	summary: "Change the user password",
	body: {
		type: "object",
		required: ["email", "code", "password"],
		properties: {
			email: { type: "string" },
			code: { type: "string" },
			password: { type: "string" }
		}
	},
	response: {
		200: {
			description: "Successful response",
			type: "object",
			properties: {
				message: { type: "string" }
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
			type: "object"
		}
	}
};

export const getPingSchema: FastifySchema = {
	description: "Ping the server",
	tags: ["Ping"],
	summary: "Ping the server",
	response: {
		200: {
			description: "Successful response",
			type: "object",
			properties: {
				message: { type: "string" }
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
			type: "object"
		}
	}
};
