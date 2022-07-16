import { AuthenticatedRequestBody } from "adapters/api/authentication/requests/authenticated.request";

import { UserEntity } from "domain/entities/user.entity";

export interface PostRegisterAuthenticationRequest {
	Body: {
		email: string;
		password: string;
		birthday: string;
	};
}

export interface PostDeleteAuthenticationRequest {
	Body: {
		email: string;
	};
}

export interface PostResendAuthenticationRequest {
	Body: {
		email: string;
	};
}

export interface PostLoginAuthenticationRequest {
	Body: {
		email: string;
		password: string;
	};
}

export interface PostChangePasswordAuthenticationRequest {
	Body: {
		email: string;
		password: string;
	};
}

export interface PostChangeEmailAuthenticationRequest extends AuthenticatedRequestBody {
	Body: {
		authUser: UserEntity;
		oldEmail: string;
		email: string;
	};
}

export interface PostVerifyEmailAuthenticationRequest {
	Body: {
		email: string;
		code: string;
	};
}

export interface PostRecoveryPwdSendCodeAuthenticationRequest {
	Body: {
		email: string;
	};
}

export interface PostRecoveryPwdChangePwdAuthenticationRequest {
	Body: {
		email: string;
		code: string;
		password: string;
	};
}
