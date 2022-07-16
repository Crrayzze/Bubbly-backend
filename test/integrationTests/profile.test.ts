/* eslint-disable @typescript-eslint/no-var-requires */
import { Response } from "light-my-request";
import { describe, it } from "mocha";
import { TestRequestUtils } from "../utils/request.utils";
import { TestResponseUtils } from "../utils/response.utils";

describe("Profile API: users", () => {
	const urlProfile: string = "/api/profile";
	const urlClient: string = "/api/client";

	describe("Update user's description", () => {
		it("it should return a 400 if the user isn't logged in", async () => {
			// given
			const url: string = `${urlProfile}/description`;
			const payload: Record<string, unknown> = { description: "Updated description" };

			// when
			const response: Response = await TestRequestUtils.postRequest(url, payload);

			// then
			TestResponseUtils.checkResponseGenericError(response);
		});
		
		it("it should return a 200 when updating the user's description", async () => {
			// given
			const url: string = `${urlProfile}/description`;
			const token: string = await TestRequestUtils.getAuthenticatedUser(5);
			const payload: Record<string, unknown> = { description: "Updated description" };

			// when
			const response: Response = await TestRequestUtils.postRequest(url, payload, token);

			// then
			TestResponseUtils.checkResponseOk(response);
		});
	});

	describe("Orientations", () => {
		it("it should return a 200 when getting all users orientation", async () => {
			// given
			const url: string = `${urlClient}/orientation`;

			// when
			const response: Response = await TestRequestUtils.getRequest(url, "token");

			// then
			TestResponseUtils.checkResponseOk(response);
		});

		it("it should return a 200 when updating the user's orientation", async () => {
			// given
			const url: string = `${urlProfile}/orientation`;
			const token: string = await TestRequestUtils.getAuthenticatedUser(5);
			const payload: Record<string, unknown> = { orientation_id: "891bccf6-cb75-4131-bb06-bf9163e0007e" };

			// when
			const response: Response = await TestRequestUtils.postRequest(url, payload, token);

			// then
			TestResponseUtils.checkResponseOk(response);
		});
	});

	describe("Search type", () => {
		it("it should return a 200 when getting all users search  type", async () => {
			// given
			const url: string = `${urlClient}/search`;

			// when
			const response: Response = await TestRequestUtils.getRequest(url, "token");

			// then
			TestResponseUtils.checkResponseOk(response);
		});

		it("it should return a 200 when updating the user's search type", async () => {
			// given
			const url: string = `${urlProfile}/search`;
			const token: string = await TestRequestUtils.getAuthenticatedUser(5);
			const payload: Record<string, unknown> = { search_id: "890fd116-8bf1-11ec-a8a3-0242ac120002" };

			// when
			const response: Response = await TestRequestUtils.postRequest(url, payload, token);

			// then
			TestResponseUtils.checkResponseOk(response);
		});
	});

	describe("Update user's preference", () => {
		// Add get call ?
		
		it("it should return a 200 when updating the user's preference", async () => {
			// given
			const url: string = `${urlProfile}/preference`;
			const token: string = await TestRequestUtils.getAuthenticatedUser(5);
			const payload: Record<string, unknown> = { age_minimum: "19", age_maximum: "26" };

			// when
			const response: Response = await TestRequestUtils.postRequest(url, payload, token);

			// then
			TestResponseUtils.checkResponseOk(response);
		});
	});


	describe("Genres", () => {
		it("it should return a 200 when getting all genres", async () => {
			// given
			const url: string = `${urlClient}/genre`;

			// when
			const response: Response = await TestRequestUtils.getRequest(url, "token");

			// then
			TestResponseUtils.checkResponseOk(response);
		});

		it("it should return a 200 when updating the user's genre", async () => {
			// given
			const url: string = `${urlProfile}/genre`;
			const token: string = await TestRequestUtils.getAuthenticatedUser(5);
			const payload: Record<string, unknown> = { genre_id: "2adcaa0b-5db8-42e9-b67d-eb7940ae58a9" };

			// when
			const response: Response = await TestRequestUtils.postRequest(url, payload, token);

			// then
			TestResponseUtils.checkResponseOk(response);
		});

	});

	describe("GetProfile", () => {
		it("it should return a 400 when the user is not authenticated", async () => {
			// given
			const profileId: string = "3965dbb3-6018-4491-b9ae-585807c115e6";

			const url: string = `${urlProfile}/profile?profile_id=${profileId}`;

			// when
			const response: Response = await TestRequestUtils.getRequest(url, "token");

			// then
			TestResponseUtils.checkResponseGenericError(response);
		});

		it("it should return a 400 when the user_id is wrong", async () => {
			// given
			const profileId: string = "fakeId";

			const url: string = `${urlProfile}/profile?profile_id=${profileId}`;
			const token: string = await TestRequestUtils.getAuthenticatedUser(5);

			// when
			const response: Response = await TestRequestUtils.getRequest(url, token);

			// then
			TestResponseUtils.checkResponseGenericError(response);
		});

		it("it should return a 200 when getting a profile", async () => {
			// given
			const profileId: string = "3965dbb3-6018-4491-b9ae-585807c115e6";

			const url: string = `${urlProfile}/profile?profile_id=${profileId}`;
			const token: string = await TestRequestUtils.getAuthenticatedUser(5);

			// when
			const response: Response = await TestRequestUtils.getRequest(url, token);

			// then
			TestResponseUtils.checkResponseOk(response);
		});


	});

	describe("Video", () => {
		it.skip("it should return a 200 when adding a video to the server", async () => {
			// given
			const url: string = `${urlProfile}/video`;
			const token: string = await TestRequestUtils.getAuthenticatedUser(5);

			// eslint-disable-next-line @typescript-eslint/typedef
			const FormData = require("form-data");
			// eslint-disable-next-line @typescript-eslint/typedef
			const form = new FormData();
			// eslint-disable-next-line @typescript-eslint/typedef
			const fs = require("fs");

			form.append("myfile", fs.createReadStream("./test/integrationTests/file/video-test.mp4"));


			// when
			const response: Response = await TestRequestUtils.postRequestVideo(url, form, token);

			// then
			TestResponseUtils.checkResponseOk(response);
		});

	});

});
