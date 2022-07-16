import { Response } from "light-my-request";
import { describe, it } from "mocha";
import { TestRequestUtils } from "../utils/request.utils";
import { TestResponseUtils } from "../utils/response.utils";
import { LoginResponsePresenter } from "adapters/api/authentication/presenters/loginResponse.authentication.presenter";
import { expect } from "chai";


describe("Authentication API:", () => {
	const urlAuthentication: string = "/api/authentication";
	const urlPing: string =  "/api/ping";

	const urlRegister: string = "/register";
	const urlResend: string = "/resendmail";
	const urlLogin: string = "/login";
	const urlChangePassword: string = "/changepassword";
	const urlChangeEmail: string = "/changeemail";
	const verifyEmail: string = "/verifyemail";
	const urlDelete: string = "/delete";

	describe("Register", () => {
		it("it should return a 200 when user has been created", async () => {
			// given
			const url: string = `${urlAuthentication}${urlRegister}`;
			const payload: Record<string, unknown> = { email: "user.test2@gmail.com", password: "bigPassword", birthday: "2002/03/29" };

			// when
			const response: Response = await TestRequestUtils.postRequest(url, payload);

			// then
			TestResponseUtils.checkResponseOk(response);
		});
	});

	describe("ResendMail", () => {
		it("it should return a 200 when mail has been send", async () => {
			// given
			const url: string = `${urlAuthentication}${urlResend}`;
			const payload: Record<string, unknown> = { email: "user.test@gmail.com"};

			// when
			const response: Response = await TestRequestUtils.postRequest(url, payload);

			// then
			TestResponseUtils.checkResponseOk(response);
		});
	});

	describe("Login", () => {
		it("it should return a 400 when email and password missmatch the user", async () => {
			// given
			const url: string = `${urlAuthentication}${urlLogin}`;
			const payload: Record<string, unknown> = { email: "wrong.email@gmail.com", password: "WrongPassword!" };

			// when
			const response: Response = await TestRequestUtils.postRequest(url, payload);

			// then
			TestResponseUtils.checkResponseGenericError(response);
		});

		it("it should return a 400 when password missmatch the user", async () => {
			// given
			const url: string = `${urlAuthentication}${urlLogin}`;
			const payload: Record<string, unknown> = { email: "user.test@gmail.com", password: "WrongPassword!" };

			// when
			const response: Response = await TestRequestUtils.postRequest(url, payload);

			// then
			TestResponseUtils.checkResponseGenericError(response);
		});

		it("it should return a 200 when user has been logged", async () => {
			// given
			const url: string = `${urlAuthentication}${urlLogin}`;
			const payload: Record<string, unknown> = { email: "user.test@gmail.com", password: "bigPassword" };

			// when
			const response: Response = await TestRequestUtils.postRequest(url, payload);

			// then
			TestResponseUtils.checkResponseOk(response);
		});
	});

	describe("Login & Token", () => {
		it("it should return a 400 when email and password missmatch the user", async () => {
			// given
			const url: string = `${urlAuthentication}${urlLogin}`;
			const payload: Record<string, unknown> = { email: "wrong.email@gmail.com", password: "WrongPassword!" };

			// when
			const response: Response = await TestRequestUtils.postRequest(url, payload);

			// then
			TestResponseUtils.checkResponseGenericError(response);
		});

		it("it should return a 400 when password missmatch the user", async () => {
			// given
			const url: string = `${urlAuthentication}${urlLogin}`;
			const payload: Record<string, unknown> = { email: "user.test@gmail.com", password: "WrongPassword!" };

			// when
			const response: Response = await TestRequestUtils.postRequest(url, payload);

			// then
			TestResponseUtils.checkResponseGenericError(response);
		});

		it("it should return a 200 when user has been logged and token should not be empty", async () => {
			// given
			const url: string = `${urlAuthentication}${urlLogin}`;
			const payload: Record<string, unknown> = { email: "user.test@gmail.com", password: "bigPassword" };

			// when
			const response: Response = await TestRequestUtils.postRequest(url, payload);

			// then
			const result: LoginResponsePresenter = TestResponseUtils.checkResponseOk(response);
			expect(result.token).to.not.be.empty;
		});
	});

	describe("ChangePassword", () => {
		it("it should return a 200 when user has been updated", async () => {
			// given
			const url: string = `${urlAuthentication}${urlChangePassword}`;
			const payload: Record<string, unknown> = { email: "bubbly.update.data@gmail.com", password: "bigPassword"};

			// when
			const response: Response = await TestRequestUtils.postRequest(url, payload);

			// then
			TestResponseUtils.checkResponseOk(response);
		});

		it("it should return a 400 mail doesn't exist", async () => {
			// given
			const url: string = `${urlAuthentication}${urlChangePassword}`;
			const payload: Record<string, unknown> = { email: "bubbly.error.update.data@gmail.com", password: "bigPassword"};

			// when
			const response: Response = await TestRequestUtils.postRequest(url, payload);

			// then
			TestResponseUtils.checkResponseGenericError(response);
		});
	});
	describe("ChangeEmail", () => {
		it("it should return a 200 when user has been updated", async () => {
			// given
			const url: string = `${urlAuthentication}${urlChangeEmail}`;
			const token: string = await TestRequestUtils.getAuthenticatedUser(4);
			const payload: Record<string, unknown> = { oldEmail: "bubbly.changeEmail@gmail.com", email: "email.updated@gmail.com"};

			// when
			const response: Response = await TestRequestUtils.postRequest(url, payload, token);
			// then
			TestResponseUtils.checkResponseOk(response);
		});

		it("it should return a 400 mail doesn't exist", async () => {
			// given
			const url: string = `${urlAuthentication}${urlChangeEmail}`;
			const payload: Record<string, unknown> = { oldEmail: "bubbly.error.update.data@gmail.com", email: "new.bubbly.error.update.data@gmail.com"};

			// when
			const response: Response = await TestRequestUtils.postRequest(url, payload);

			// then
			TestResponseUtils.checkResponseGenericError(response);
		});
	});
	describe("VerifyEmail", () => {
		it("it should return a 200 when email has been validated", async () => {
			// given
			const url: string = `${urlAuthentication}${verifyEmail}`;
			const payload: Record<string, unknown> = { email: "bubbly.vallidated@gmail.com", code: "0123"};

			// when
			const response: Response = await TestRequestUtils.postRequest(url, payload);

			// then
			TestResponseUtils.checkResponseOk(response);
		});

		it("it should return a 400 mail isn't validated", async () => {
			// given
			const url: string = `${urlAuthentication}${verifyEmail}`;
			const payload: Record<string, unknown> = { email: "bubbly.vallidated@gmail.com", code: "0000"};

			// when
			const response: Response = await TestRequestUtils.postRequest(url, payload);

			// then
			TestResponseUtils.checkResponseGenericError(response);
		});
	});
	describe("RecoveryPwd", () => {
		it("it should return a 200 when mail with the code has been send", async () => {
			// given
			const url: string = `${urlAuthentication}${urlResend}`;
			const payload: Record<string, unknown> = { email: "recovery.sendcode@gmail.com"};

			// when
			const response: Response = await TestRequestUtils.postRequest(url, payload);

			// then
			TestResponseUtils.checkResponseOk(response);
		});
		it("it should return a 200 when the password has been changed", async () => {
			// given
			const url: string = `${urlAuthentication}${urlResend}`;
			const payload: Record<string, unknown> = { email: "recovery.ChangePwd@gmail.com", code: "1234", password: "Password"};

			// when
			const response: Response = await TestRequestUtils.postRequest(url, payload);

			// then
			TestResponseUtils.checkResponseOk(response);
		});
	});

	describe("Delete Account", () => {
		it("it should return a 400 when user is not logged in", async () => {
			// given
			const url: string = `${urlAuthentication}${urlDelete}`;
			const payload: Record<string, unknown> = { email: "delete.real.user@gmail.com"};

			// when
			const response: Response = await TestRequestUtils.postRequest(url, payload);

			// then
			TestResponseUtils.checkResponseGenericError(response);
		});
		it("it should return a 200 when user has been deleted", async () => {
			// given
			const url: string = `${urlAuthentication}${urlDelete}`;
			const token: string = await TestRequestUtils.getAuthenticatedUser(8);
			const payload: Record<string, unknown> = { email: "delete.real.user@gmail.com"};

			// when
			const response: Response = await TestRequestUtils.postRequest(url, payload, token);

			// then
			TestResponseUtils.checkResponseOk(response);
		});
		it("it should return a 400 if user does not exist", async () => {
			// given
			const url: string = `${urlAuthentication}${urlDelete}`;
			const payload: Record<string, unknown> = { email: "delete.not.real.user@gmail.com"};

			// when
			const response: Response = await TestRequestUtils.postRequest(url, payload);

			// then
			TestResponseUtils.checkResponseGenericError(response);
		});
	});

	describe("Ping", () => {
		it("it should return a 200 when the server is listening", async () => {
			// given
			const url: string = `${urlPing}`;

			// when
			const response: Response = await TestRequestUtils.getRequest(url, "token");

			// then
			TestResponseUtils.checkResponseOk(response);
		});
	});
});
