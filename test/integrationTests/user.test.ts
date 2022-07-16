import { UserPresenter } from "adapters/api/client/presenters/user.presenter";
import { expect } from "chai";
import { Response } from "light-my-request";
import { describe, it } from "mocha";
import { TestRequestUtils } from "../utils/request.utils";
import { TestResponseUtils } from "../utils/response.utils";

describe("Client API: users", () => {
	const urlClient: string = "/api/client";
	const urlUsers: string = "/users";

	describe("Get user by id", () => {
		it("it should return a 200 when fectching user by id", async () => {
			// given
			const userId: string = "f787464d-6543-4404-bd03-f7bc6ff61c2d";
			const url: string = `${urlClient}${urlUsers}?user_id=${userId}`;

			// when
			const response: Response = await TestRequestUtils.getRequest(url, "token");

			// then
			const result: UserPresenter = TestResponseUtils.checkResponseOk(response);

			expect(result.id).to.be.equal(userId);

		});
	});
});
