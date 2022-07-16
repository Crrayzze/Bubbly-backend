import { ApiMapper } from "application/mappers/api.mapper";
import { UserRecoveryPwdSendCodeEntity } from "domain/entities/userRecoveryPwd.SendCode.entity";
import { UserRecoveryPwdSendCodePayload } from "adapters/api/authentication/payloads/authentication.payload";
import { UserPresenter } from "adapters/api/client/presenters/user.presenter";

export class UserRecoveryPwdSendCodeApiMapper implements ApiMapper<UserRecoveryPwdSendCodeEntity, UserPresenter, UserRecoveryPwdSendCodePayload> {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	toEntity(payload: UserRecoveryPwdSendCodePayload): UserRecoveryPwdSendCodeEntity {
		const entity: UserRecoveryPwdSendCodeEntity = {
			email: payload.email
		};
		return entity;
	}

  	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	toApi(entity: UserRecoveryPwdSendCodeEntity): UserPresenter {
		throw new Error("not implemented");
	}
}
