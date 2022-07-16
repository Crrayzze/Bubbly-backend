import { ApiMapper } from "application/mappers/api.mapper";
import { UserRecoveryPwdChangePwdEntity } from "domain/entities/userRecoveryPwd.ChangePwd.entity";
import { UserRecoveryPwdChangePwdPayload } from "adapters/api/authentication/payloads/authentication.payload";
import { UserPresenter } from "adapters/api/client/presenters/user.presenter";

export class UserRecoveryPwdChangePwdApiMapper implements ApiMapper<UserRecoveryPwdChangePwdEntity, UserPresenter, UserRecoveryPwdChangePwdPayload> {
	toEntity(payload: UserRecoveryPwdChangePwdPayload): UserRecoveryPwdChangePwdEntity {
		const entity: UserRecoveryPwdChangePwdEntity = {
			email: payload.email,
			code: payload.code,
			password: payload.password
		};
		return entity;
	}

  	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	toApi(entity: UserRecoveryPwdChangePwdEntity): UserPresenter {
		throw new Error("not implemented");
	}
}
