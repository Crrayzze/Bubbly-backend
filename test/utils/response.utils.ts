/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect } from "chai";
import { Response } from "light-my-request";

export class TestResponseUtils {
	static parseJsonResponse(response: Response): any {
		return JSON.parse(response.payload);
	}
	
	static checkResponseUnauthorized(response: Response): void {
		expect(response.statusCode).to.equal(401);

		const json: any = TestResponseUtils.parseJsonResponse(response);
		expect(json.message).to.equal("Error: not authenticated or token expired");
	}

	static checkResponseForbidden(response: Response): void {
		expect(response.statusCode).to.equal(403);

		const json: any = TestResponseUtils.parseJsonResponse(response);
		expect(json.message).to.equal("Error: resource not allowed");
	}

	static checkResponseGenericError(response: Response): void {
		expect(response.statusCode).to.equal(400);

		// const json: any = TestResponseUtils.parseJsonResponse(response);
		// expect(json.message).to.equal("Error: an unknown error occured");
	}

	static checkResponseApplicationError(response: Response, message: string): void {
		TestResponseUtils.checkResponseError(response, message, 400);
	}

	static checkResponseError(response: Response, message: string, errorCode: number): void {
		expect(response.statusCode).to.equal(errorCode);

		const json: any = TestResponseUtils.parseJsonResponse(response);
		expect(json.message).to.equal(message);
	}

	static checkResponseOk<T>(response: Response): T {
		expect(response.statusCode).to.equal(200);

		return TestResponseUtils.parseJsonResponse(response);
	}

	static checkResponseQuickerThan(timeBefore: Date, timeAfter: Date, quickThanInSeconds: number): void {
		const timeDifference: number = (timeAfter.getTime() - timeBefore.getTime()) / 1000;
		expect(timeDifference).to.be.lessThan(quickThanInSeconds);
	}
}
