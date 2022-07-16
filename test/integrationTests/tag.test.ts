import { TagPresenter } from "adapters/api/client/presenters/tag.presenter";
import { GenericResponsePresenter } from "adapters/api/authentication/presenters/genericResponse.authentication.presenter";
import { expect } from "chai";
import { Response } from "light-my-request";
import { describe, it } from "mocha";
import { TestRequestUtils } from "../utils/request.utils";
import { TestResponseUtils } from "../utils/response.utils";

describe("Client API: tag", () => {
	const urlClient: string = "/api/client";
	const urlProfile: string = "/api/profile";
	const urlTag: string = "/tags";

	describe("Get all tags available in the application", () => {
		it("it should return a 200 when fectching all tags", async () => {
			// given
			const url: string = `${urlClient}${urlTag}`;
			const token: string = await TestRequestUtils.getAuthenticatedUser(1);
			// when
			const response: Response = await TestRequestUtils.getRequest(url, token);

			// then
			const result: TagPresenter[] = TestResponseUtils.checkResponseOk(response);

			// eslint-disable-next-line @typescript-eslint/no-unused-expressions
			expect(result).to.not.be.empty;
		});
	});

	describe("Add new tags", () => {
		it("it should return a 200 when adding one tag", async () => {
			// given
			const url: string = `${urlProfile}${urlTag}`;
			const token: string = await TestRequestUtils.getAuthenticatedUser(6);
			const payload: Record<string, unknown> = { tags_id: ["95336a4b-4676-48fe-9560-ec2809e294f4"]};
			
			// when
			const response: Response = await TestRequestUtils.postRequest(url, payload, token);

			// then
			TestResponseUtils.checkResponseOk(response);
		});
	});
});
