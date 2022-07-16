import { Response } from "light-my-request";
import { describe, it } from "mocha";
import { TestRequestUtils } from "../utils/request.utils";
import { TestResponseUtils } from "../utils/response.utils";

describe("Like API: ", () => {
	const urlProfile: string = "/api/profile";

	describe("Like profile", () => {
		it("it should return a 400 if the user isn't logged in", async () => {
			// given
			const url: string = `${urlProfile}/like`;
			const payload: Record<string, unknown> = { profile_id: "3965dbb3-6018-4491-b9ae-585807c11578" };

			// when
			const response: Response = await TestRequestUtils.postRequest(url, payload);

			// then
			TestResponseUtils.checkResponseGenericError(response);
		});

		it("it should return a 200 when the profile is liked", async () => {
			// given
			const url: string = `${urlProfile}/like`;
			const token: string = await TestRequestUtils.getAuthenticatedUser(5);
			const payload: Record<string, unknown> = { profile_id: "3965dbb3-6018-4491-b9ae-585807c11578" };

			// when
			const response: Response = await TestRequestUtils.postRequest(url, payload, token);

			// then
			TestResponseUtils.checkResponseOk(response);
		});

		it("it should return a 400 when the profile is already liked", async () => {
			// given
			const url: string = `${urlProfile}/like`;
			const token: string = await TestRequestUtils.getAuthenticatedUser(5);
			const payload: Record<string, unknown> = { profile_id: "3965dbb3-6018-4491-b9ae-585807c11578" };

			// when
			const response: Response = await TestRequestUtils.postRequest(url, payload, token);

			// then
			TestResponseUtils.checkResponseApplicationError(response, "Profile already liked");
		});

		it("it should return a 200 when the profile is liked and a new match append", async () => {
			// given
			const url: string = `${urlProfile}/like`;
			const token: string = await TestRequestUtils.getAuthenticatedUser(5);
			const payload: Record<string, unknown> = { profile_id: "4ceecee0-7ee4-4eb4-9dfb-40dc2cc364d9" };

			// when
			const response: Response = await TestRequestUtils.postRequest(url, payload, token);

			// then
			TestResponseUtils.checkResponseOk(response);
		});

		it("it should return a 400 when a match already occured", async () => {
			// given
			const url: string = `${urlProfile}/like`;
			const token: string = await TestRequestUtils.getAuthenticatedUser(5);
			const payload: Record<string, unknown> = { profile_id: "4ceecee0-7ee4-4eb4-9dfb-40dc2cc364d9" };

			// when
			const response: Response = await TestRequestUtils.postRequest(url, payload, token);

			// then
			TestResponseUtils.checkResponseApplicationError(response, "Profile already matched");
		});
	});

	describe("GetLike profile", () => {
		it("it should return a 400 if the user isn't logged in", async () => {
			// given
			const url: string = `${urlProfile}/like`;

			// when
			const response: Response = await TestRequestUtils.getRequest(url, "token");

			// then
			TestResponseUtils.checkResponseGenericError(response);
		});

		it("it should return a 200 when getting liked profiles", async () => {
			// given
			const url: string = `${urlProfile}/like`;
			const token: string = await TestRequestUtils.getAuthenticatedUser(5);

			// when
			const response: Response = await TestRequestUtils.getRequest(url, token);

			// then
			TestResponseUtils.checkResponseOk(response);
		});

	});

	describe("GetMatch profile", () => {
		it("it should return a 400 if the user isn't logged in", async () => {
			// given
			const url: string = `${urlProfile}/match`;

			// when
			const response: Response = await TestRequestUtils.getRequest(url, "token");

			// then
			TestResponseUtils.checkResponseGenericError(response);
		});

		it("it should return a 200 when getting every match", async () => {
			// given
			const url: string = `${urlProfile}/match`;
			const token: string = await TestRequestUtils.getAuthenticatedUser(5);

			// when
			const response: Response = await TestRequestUtils.getRequest(url, token);

			// then
			TestResponseUtils.checkResponseOk(response);
		});

	});
});
