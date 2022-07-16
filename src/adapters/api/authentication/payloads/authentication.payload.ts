import { BasePayloadEntity } from "domain/payloads/base.payload.entity";

export interface UserRegisterPayload extends BasePayloadEntity {
	email: string;
	password: string;
}

export interface UserDeletePayload extends BasePayloadEntity {
	email: string;
}

export interface UserResendPayload extends BasePayloadEntity {
	email: string;
}

export interface UserChangePasswordPayload extends BasePayloadEntity {
	email: string;
	password: string;
}

export interface UserChangeEmailPayload extends BasePayloadEntity {
	oldEmail: string;
	email: string;
}

export interface UserVerifyEmailPayload extends BasePayloadEntity {
	email: string;
	code: string;
}

export interface UserRecoveryPwdSendCodePayload extends BasePayloadEntity {
	email: string;
}

export interface UserRecoveryPwdChangePwdPayload extends BasePayloadEntity {
	email: string;
	code: string;
	password: string;
}
