/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from "light-my-request";
import { TestResponseUtils } from "./response.utils";


import { LoginResponsePresenter } from "adapters/api/authentication/presenters/loginResponse.authentication.presenter";

import server from "../../src/infrastructure/app";

export class TestRequestUtils {
	static urlAuthentication: string = "/api/authentication";
	static urlLogin: string = "/login";

	static async getRequest(url: string, token: string): Promise<Response> {
		return await server.inject({ method: "GET", url, headers: { authorization: token } });
	}

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	static async postRequestVideo(url: string, payload: any, token?: string): Promise<Response> {
		return await server.inject({ method: "POST", url, payload, headers: { authorization: token, "content-type": "multipart/form-data"} });
	}


	//TODO payload should extend PayloadBase <T extends BasePayloadEntity>
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	static async postRequest(url: string, payload: any, token?: string): Promise<Response> {
		return this.postAuthRequest(url, payload, token || "");
	}

	//TODO payload should extend PayloadBase <T extends BasePayloadEntity>
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	static async postAuthRequest(url: string, payload: any, token: string): Promise<Response> {
		return await server.inject({ method: "POST", url, payload, headers: { authorization: token } });
	}

	static async putRequest(url: string, payload: Record<string, unknown>): Promise<Response> {
		return await server.inject({ method: "PUT", url, payload });
	}

	static async putRequestAuthenticate(url: string, payload: Record<string, unknown>, token: string): Promise<Response> {
		return await server.inject({ method: "PUT", url, payload, headers: { authorization: token } });
	}

	static async getAuthenticatedUser(user: number): Promise<string> {
		const url: string = "/api/authentication/login";
		let payload: Record<string, unknown>;

		if (user === 1) { // UserTest
			payload = { email: "user.test@gmail.com", password: "bigPassword" };
		} else if (user === 2) { // UserUpdateData
			payload = { email: "bubbly.update.data@gmail.com", password: "notSoBig" };
		} else if (user === 3) { // UserValidateAccount
			payload = { email: "bubbly.vallidated@gmail.com", password: "notSoBig" };
		} else if (user === 4) { // UserChangeEmail
			payload = { email: "bubbly.changeEmail@gmail.com", password: "notSoBig" };
		} else if (user === 5) { // UserUpdateProfile
			payload = { email: "user.updateprofilel@gmail.com", password: "ReallyHuuugePassword" };
		} else if (user === 6) { // AddTagsUser
			payload = { email: "addtagsuser@gmail.com", password: "ReallyHuuugePassword" };
		} else if (user === 8) { // DeleteUser
			payload = { email: "delete.real.user@gmail.com", password: "BigPassWord123" };
		}

		const response: Response = await TestRequestUtils.postRequest(url, payload);

		const result: LoginResponsePresenter = TestResponseUtils.checkResponseOk(response);

		return result.token;
	}
}
