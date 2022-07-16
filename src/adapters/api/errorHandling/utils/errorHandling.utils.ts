import { GenericError } from "domain/errors/generic.error.entity";

export class ErrorHandling {
	static createApplicationError(applicationError: Error, errorMessage: string = "Error: an unknown error occured"): Error {
		let message: string;
		let code: number = 400;
		if (applicationError instanceof GenericError) {
			message = applicationError.message;
			code = applicationError.statusCode;
		} else {
			console.log(applicationError.message); //Should be loged in a proper logger later. Keeping it here for debug purpose
			message = errorMessage;
		}

		const error: GenericError = new GenericError(message, code);
		return error;
	}

	static createAuthorizationError(applicationError: Error, errorMessage: string = "Error: an unknown error occured"): Error {
		let message: string;
		let code: number = 4003;
		if (applicationError instanceof GenericError) {
			message = applicationError.message;
			code = applicationError.statusCode;
		} else {
			console.log(applicationError.message); //Should be loged in a proper logger later. Keeping it here for debug purpose
			message = errorMessage;
		}

		const error: GenericError = new GenericError(message, code);
		return error;
	}
}
