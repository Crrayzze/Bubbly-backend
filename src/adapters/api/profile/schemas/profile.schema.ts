import { FastifySchema } from "fastify";

export const postDescriptionProfileSchema: FastifySchema = {
	description: "Function to modify the description of the profile\n\nAuthorization required",
	tags: ["Profile"],
	summary: "Send the new description",
	body: {
		type: "object",
		required: ["description"],
		properties: {
			description: { type: "string" }
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
			type: "object",
			properties: {
				message: { type: "string" }
			}
		}
	}
};

export const postTagsSchema: FastifySchema = {
	description: "Function to modify the tags of the profile\n\nAuthorization required",
	tags: ["Profile"],
	summary: "Send the new tags",
	body: {
		tags_id: {
			type: "array",
			items: {
				type: "string"
			}
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
			type: "object",
			properties: {
				message: { type: "string" }
			}
		}
	}
};

export const postOrientationSchema: FastifySchema = {
	description: "Function to modify the sexual orientation of the profile\n\nAuthorization required",
	tags: ["Profile"],
	summary: "Send the new sexual orientation",
	body: {
		type: "object",
		required: ["orientation_id"],
		properties: {
			orientation_id: { type: "string" }
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
			type: "object",
			properties: {
				message: { type: "string" }
			}
		}
	}
};

export const postSearchSchema: FastifySchema = {
	description: "Function to modify the search type of the profile\n\nAuthorization required",
	tags: ["Profile"],
	summary: "Send the new type of search",
	body: {
		type: "object",
		required: ["search_id"],
		properties: {
			search_id: { type: "string" }
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

export const postPreferenceSchema: FastifySchema = {
	description: "Function to modify the preferences of the profile\n\nAuthorization required",
	tags: ["Profile"],
	summary: "Send the new preferences",
	body: {
		type: "object",
		required: ["age_minimum", "age_maximum"],
		properties: {
			age_minimum: { type: "number" },
			age_maximum: { type: "number" }
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

export const postGenreSchema: FastifySchema = {
	description: "Function to modify the gender of the profile\n\nAuthorization required",
	tags: ["Profile"],
	summary: "Send the new gender",
	body: {
		type: "object",
		required: ["genre_id"],
		properties: {
			genre_id: { type: "string" }
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
			type: "object",
			properties: {
				message: { type: "string" }
			}
		}
	}
};

export const postLikeSchema: FastifySchema = {
	description: "Function to like the profile of someone else\n\nAuthorization required",
	tags: ["Profile"],
	summary: "Post a like",
	body: {
		type: "object",
		required: ["profile_id"],
		properties: {
			profile_id: { type: "string" }
		}
	},
	response: {
		200: {
			description: "Successful response",
			type: "object",
			properties: {
				message: { type: "string" },
				match: { type: "boolean" }
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

export const postVideoSchema: FastifySchema = {
	description: "Function to post a video to my profile\n\nAuthorization required",
	tags: ["Profile"],
	summary: "Post a video",
	consumes: ["multipart/form-data"],
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
			type: "object",
			properties: {
				message: { type: "string" }
			}
		},
		409: {
			description: "Conflict",
			type: "object",
			properties: {
				message: { type: "string" }
			}
		}
	}
};

export const getLikeSchema: FastifySchema = {
	description: "Get like\n\nAuthorization required",
	tags: ["Profile"],
	summary: "Get like",
	response: {
		200: {
			description: "Successful response",
			type: "array",
			items: {
				type: "object",
				properties: {
					user_id: { type: "string" },
					update_date: { type: "string" }
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

export const getMatchSchema: FastifySchema = {
	description: "Get match\n\nAuthorization required",
	tags: ["Profile"],
	summary: "Get match",
	response: {
		200: {
			description: "Successful response",
			type: "array",
			items: {
				type: "object",
				properties: {
					user_id: { type: "string" },
					update_date: { type: "string" }
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

export const getProfileSchema: FastifySchema = {
	description: "Get Profile\n\nAuthorization required",
	tags: ["Profile"],
	summary: "Get profile",
	querystring: {
		profile_id: { type: "string" }
	},
	response: {
		200: {
			description: "Successful response",
			type: "object",
			properties: {
				id: { type: "string" },
				firstName: { type: "string" },
				lastName: { type: "string" },
				phoneNbr: { type: "string" },
				birthday: { type: "string" },
				orientation: { 
					type: "object",
					properties: {
						id: { type: "string" },
						orientation: { type: "string" }
					}
				},
				genre: {
					type: "object",
					properties: {
						id: { type: "string" },
						genre: { type: "string" }
					}
				},
				search: {
					type: "object",
					properties: {
						id: { type: "string" },
						search: { type: "string" }
					}
				},
				preference: {
					type: "object",
					properties: {
						age_minimum: { type: "number" },
						age_maximum: { type: "number"}
					}
				},
				tags: {
					type: "array",
					items: {
						type: "object",
						properties: {
							id: { type: "string" },
							name: { type: "string" }
						}
					}
				},
				videos: {
					type: "array",
					items: {
						type: "object",
						properties: {
							id: { type: "string" },
							publishDate: { type: "string" },
							url: { type: "string" },
							updateData: { type: "string" }
						}
					}
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
