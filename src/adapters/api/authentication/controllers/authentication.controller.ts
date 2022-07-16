import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { ErrorHandling } from "adapters/api/errorHandling/utils/errorHandling.utils";
// eslint-disable-next-line max-len
import { PostRegisterAuthenticationRequest, PostLoginAuthenticationRequest, PostResendAuthenticationRequest, PostChangePasswordAuthenticationRequest, PostChangeEmailAuthenticationRequest, PostVerifyEmailAuthenticationRequest, PostRecoveryPwdSendCodeAuthenticationRequest, PostRecoveryPwdChangePwdAuthenticationRequest, PostDeleteAuthenticationRequest } from "adapters/api/authentication/requests/authentication.request";
import { GenericResponsePresenter } from "adapters/api/authentication/presenters/genericResponse.authentication.presenter";
import { LoginResponsePresenter } from "adapters/api/authentication/presenters/loginResponse.authentication.presenter";
import { UserRegisterApiMapper } from "adapters/api/authentication/mappers/userRegister.authentication.mapper";
import { UserResendApiMapper } from "adapters/api/authentication/mappers/userResendEmail.authentication.mapper";
import { GenericResponseApiMapper } from "adapters/api/authentication/mappers/userRegisterResponse.authentication.mapper";
import { LogginResponseApiMapper } from "adapters/api/authentication/mappers/userLoginResponse.authentication.mapper";
import { UserChangePasswordApiMapper } from "adapters/api/authentication/mappers/changePassword.authentication.mapper";
import { UserChangeEmailApiMapper } from "adapters/api/authentication/mappers/changeEmail.authentication.mapper";
import { UserVerifyEmailApiMapper } from "adapters/api/authentication/mappers/verifyEmail.authentication.mapper";
import { UserRecoveryPwdSendCodeApiMapper } from "adapters/api/authentication/mappers/recoveryPwd.SendCode.authentication.mapper";
import { UserRecoveryPwdChangePwdApiMapper } from "adapters/api/authentication/mappers/recoveryPwd.ChangePwd.authentication.mapper";
import { UserDeleteApiMapper } from "adapters/api/authentication/mappers/userDelete.authentication.mapper";


import { UserEntity } from "domain/entities/user.entity";
import { LoginResponseEntity } from "domain/entities/loginResponse.entity";
import { GenericResponseEntity } from "domain/entities/genericResponse.entity";
import { UserChangePasswordEntity } from "domain/entities/userChangePassword.entity";
import { UserChangeEmailEntity } from "domain/entities/userChangeEmail.entity";
import { UserVerifyEmailEntity } from "domain/entities/userVerifyEmail.entity";
import { UserRecoveryPwdSendCodeEntity } from "domain/entities/userRecoveryPwd.SendCode.entity";
import { UserRecoveryPwdChangePwdEntity } from "domain/entities/userRecoveryPwd.ChangePwd.entity";

import { RegisterUserUseCase } from "application/useCases/authentication/register.authentication.usecase";
import { LoginUserUseCase } from "application/useCases/authentication/login.authentication.usecase";
import { ResendUserUseCase } from "application/useCases/authentication/resend.authentication.usecase";
import { GetUserByEmailUseCase } from "application/useCases/authentication/getUserByEmail.authentication.usecase";
import { UpdateUserUseCase } from "application/useCases/authentication/updateUser.authentication.usecase";
import { VerifyEmailUserUseCase } from "application/useCases/authentication/verifyEmail.authentication.usecase";
import { RecoveryPwdSendCodeUserUseCase } from "application/useCases/authentication/recoveryPwd.SendCode.authentication.usecase";
import { RecoveryPwdChangePwdUserUseCase } from "application/useCases/authentication/recoveryPwd.ChangePwd.authentication.usecase";
import { DeleteUserUseCase } from "application/useCases/authentication/delete.authentication.usecase";

const postRegisterAuthentication = async (req: FastifyRequest<PostRegisterAuthenticationRequest>, reply: FastifyReply, server: FastifyInstance): Promise<void> => {
	try {
		const userRegisterApiMapper: UserRegisterApiMapper = new UserRegisterApiMapper();
		const userEntity: UserEntity = userRegisterApiMapper.toEntity(req.body);

		const registerUseCase: RegisterUserUseCase = new RegisterUserUseCase(
			userEntity, server.authenticationRepository, server.sendMailRepository, server.profileDataRepository, req.body.birthday, server.preferenceRepository);
		const genericResponseEntity: GenericResponseEntity = await registerUseCase.execute();

		const genericResponseApiMapper: GenericResponseApiMapper = new GenericResponseApiMapper();
		const genericResponsePresenter: GenericResponsePresenter = genericResponseApiMapper.toApi(genericResponseEntity);

		void reply.send(genericResponsePresenter);
	} catch (err) {
		console.log(err);
		throw ErrorHandling.createApplicationError(err, "An unknown error occurred while trying to register, please try again");
	}
};

const postDeleteAuthentication = async (req: FastifyRequest<PostDeleteAuthenticationRequest>, reply: FastifyReply, server: FastifyInstance): Promise<void> => {
	try {
		const userDeleteApiMapper: UserDeleteApiMapper = new UserDeleteApiMapper();
		const userEntity: UserEntity = userDeleteApiMapper.toEntity(req.body);

		userEntity.profileData = undefined;
		const userGetAccountByEmail: GetUserByEmailUseCase = new GetUserByEmailUseCase(userEntity.email, server.authenticationRepository);
		const curentUserEntity: UserEntity = await userGetAccountByEmail.execute();

		const deleteUseCase: DeleteUserUseCase = new DeleteUserUseCase(curentUserEntity, server.authenticationRepository, server.sendMailRepository);
		const genericResponseEntity: GenericResponseEntity = await deleteUseCase.execute();

		const genericResponseApiMapper: GenericResponseApiMapper = new GenericResponseApiMapper();
		const genericResponsePresenter: GenericResponsePresenter = genericResponseApiMapper.toApi(genericResponseEntity);

		void reply.send(genericResponsePresenter);
	} catch (err) {
		console.log(err);
		throw ErrorHandling.createApplicationError(err, "An unknown error occurred while trying to registe, please try again");
	}
};

const postResendAuthentication = async (req: FastifyRequest<PostResendAuthenticationRequest>, reply: FastifyReply, server: FastifyInstance): Promise<void> => {
	try {
		const userResendApiMapper: UserResendApiMapper = new UserResendApiMapper();
		const userEntity: UserEntity = userResendApiMapper.toEntity(req.body);

		const userGetAccountByEmail: GetUserByEmailUseCase = new GetUserByEmailUseCase(userEntity.email, server.authenticationRepository);
		const curentUserEntity: UserEntity = await userGetAccountByEmail.execute();

		userEntity.code = curentUserEntity.code;

		const resendUseCase: ResendUserUseCase = new ResendUserUseCase(userEntity, /*server.authenticationRepository,*/ server.sendMailRepository);
		const genericResponseEntity: GenericResponseEntity = await resendUseCase.execute();

		const genericResponseApiMapper: GenericResponseApiMapper = new GenericResponseApiMapper();
		const genericResponsePresenter: GenericResponsePresenter = genericResponseApiMapper.toApi(genericResponseEntity);

		void reply.send(genericResponsePresenter);
	} catch (err) {
		console.log(err);
		throw ErrorHandling.createApplicationError(err, "An unknown error occurred while trying to registe, please try again");
	}
};

const postLoginAuthentication = async (req: FastifyRequest<PostLoginAuthenticationRequest>, reply: FastifyReply, server: FastifyInstance): Promise<void> => {
	try {
		const userRegisterApiMapper: UserRegisterApiMapper = new UserRegisterApiMapper();
		const userEntity: UserEntity = userRegisterApiMapper.toEntity(req.body);

		const loginUserUseCase: LoginUserUseCase = new LoginUserUseCase(userEntity, server.authenticationRepository);
		const loginResponseEntity: LoginResponseEntity = await loginUserUseCase.execute();
		
		const logginResponseApiMapper: LogginResponseApiMapper = new LogginResponseApiMapper();
		const loginResponsePresenter: LoginResponsePresenter = logginResponseApiMapper.toApi(loginResponseEntity);

		void reply.send(loginResponsePresenter);
	} catch (err) {
		throw ErrorHandling.createApplicationError(err, "An unknown error occurred while trying to registe, please try again");
	}
};

const postChangePasswordAuthentication = async (req: FastifyRequest<PostChangePasswordAuthenticationRequest>, reply: FastifyReply, server: FastifyInstance): Promise<void> => {
	try {
		const userChangePasswordApiMapper: UserChangePasswordApiMapper = new UserChangePasswordApiMapper();
		const userEntity: UserChangePasswordEntity = userChangePasswordApiMapper.toEntity(req.body);

		const userGetAccountByEmail: GetUserByEmailUseCase = new GetUserByEmailUseCase(userEntity.email, server.authenticationRepository);
		const curentUserEntity: UserEntity = await userGetAccountByEmail.execute();

		curentUserEntity.password = userEntity.password;

		const updateUserUseCase: UpdateUserUseCase = new UpdateUserUseCase(curentUserEntity, server.authenticationRepository, server.sendMailRepository);
		const genericResponseEntity: GenericResponseEntity = await updateUserUseCase.execute();

		const genericResponseApiMapper: GenericResponseApiMapper = new GenericResponseApiMapper();
		const genericResponsePresenter: GenericResponsePresenter = genericResponseApiMapper.toApi(genericResponseEntity);

		void reply.send(genericResponsePresenter);
	} catch (err) {
		throw ErrorHandling.createApplicationError(err, "An unknown error occurred while trying to update account, please try again");
	}
};

const postChangeEmailAuthentication = async (req: FastifyRequest<PostChangeEmailAuthenticationRequest>, reply: FastifyReply, server: FastifyInstance): Promise<void> => {
	try {
		const userChangeEmailApiMapper: UserChangeEmailApiMapper = new UserChangeEmailApiMapper();
		const userEntity: UserChangeEmailEntity = userChangeEmailApiMapper.toEntity(req.body);
		
		const userGetAccountByEmail: GetUserByEmailUseCase = new GetUserByEmailUseCase(userEntity.oldEmail, server.authenticationRepository);
		const curentUserEntity: UserEntity = await userGetAccountByEmail.execute();

		curentUserEntity.email = userEntity.email;

		const updateUserUseCase: UpdateUserUseCase = new UpdateUserUseCase(curentUserEntity, server.authenticationRepository, server.sendMailRepository);
		const genericResponseEntity: GenericResponseEntity = await updateUserUseCase.execute();
		const genericResponseApiMapper: GenericResponseApiMapper = new GenericResponseApiMapper();
		const genericResponsePresenter: GenericResponsePresenter = genericResponseApiMapper.toApi(genericResponseEntity);

		void reply.send(genericResponsePresenter);
	} catch (err) {
		throw ErrorHandling.createApplicationError(err, "An unknown error occurred while trying to update account, please try again");
	}
};

const postVerifyEmailAuthentication = async (req: FastifyRequest<PostVerifyEmailAuthenticationRequest>, reply: FastifyReply, server: FastifyInstance): Promise<void> => {
	try {
		const userVerifyEmailApiMapper: UserVerifyEmailApiMapper = new UserVerifyEmailApiMapper();
		const userEntity: UserVerifyEmailEntity = userVerifyEmailApiMapper.toEntity(req.body);


		const updateUserUseCase: VerifyEmailUserUseCase = new VerifyEmailUserUseCase(server.authenticationRepository, server.sendMailRepository, userEntity.email, userEntity.code);
		const genericResponseEntity: GenericResponseEntity = await updateUserUseCase.execute();

		const genericResponseApiMapper: GenericResponseApiMapper = new GenericResponseApiMapper();
		const genericResponsePresenter: GenericResponsePresenter = genericResponseApiMapper.toApi(genericResponseEntity);

		void reply.send(genericResponsePresenter);
	} catch (err) {
		throw ErrorHandling.createApplicationError(err, "An unknown error occurred while trying to update account, please try again");
	}
};

/*
RecoveryPwdSendCode
*/
const postRecoveryPwdSendCodeAuthentication = async (req: FastifyRequest<PostRecoveryPwdSendCodeAuthenticationRequest>, reply: FastifyReply, server: FastifyInstance): Promise<void> => {
	try {
		const userRecoveryPwdSendCodeApiMapper: UserRecoveryPwdSendCodeApiMapper= new UserRecoveryPwdSendCodeApiMapper();
		const userEntity: UserRecoveryPwdSendCodeEntity = userRecoveryPwdSendCodeApiMapper.toEntity(req.body);


		const updateUserUseCase: RecoveryPwdSendCodeUserUseCase = new RecoveryPwdSendCodeUserUseCase(server.authenticationRepository, server.sendMailRepository, userEntity.email);
		const genericResponseEntity: GenericResponseEntity = await updateUserUseCase.execute();

		const genericResponseApiMapper: GenericResponseApiMapper = new GenericResponseApiMapper();
		const genericResponsePresenter: GenericResponsePresenter = genericResponseApiMapper.toApi(genericResponseEntity);


		void reply.send(genericResponsePresenter);
	} catch (err) {
		throw ErrorHandling.createApplicationError(err, "An unknown error occurred while trying to update account, please try again");
	}
};

const postRecoveryPwdChangePwdAuthentication = async (req: FastifyRequest<PostRecoveryPwdChangePwdAuthenticationRequest>, reply: FastifyReply, server: FastifyInstance): Promise<void> => {
	try {
		const userRecoveryPwdChangePwdApiMapper: UserRecoveryPwdChangePwdApiMapper= new UserRecoveryPwdChangePwdApiMapper();
		const userEntity: UserRecoveryPwdChangePwdEntity = userRecoveryPwdChangePwdApiMapper.toEntity(req.body);

		const updateUserUseCase: RecoveryPwdChangePwdUserUseCase = new RecoveryPwdChangePwdUserUseCase(
			server.authenticationRepository, server.sendMailRepository, userEntity.email, userEntity.code, userEntity.password);
		const genericResponseEntity: GenericResponseEntity = await updateUserUseCase.execute();

		const genericResponseApiMapper: GenericResponseApiMapper = new GenericResponseApiMapper();
		const genericResponsePresenter: GenericResponsePresenter = genericResponseApiMapper.toApi(genericResponseEntity);


		void reply.send(genericResponsePresenter);
	} catch (err) {
		throw ErrorHandling.createApplicationError(err, "An unknown error occurred while trying to update account, please try again");
	}
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getPing = async (req: FastifyRequest<PostRecoveryPwdChangePwdAuthenticationRequest>, reply: FastifyReply, server: FastifyInstance): Promise<void> => {
	try {
		const genericResponsePresenter: GenericResponsePresenter = { message: "Server is listening" };
		void reply.send(genericResponsePresenter);
	} catch (err) {
		throw ErrorHandling.createApplicationError(err, "An unknown error occurred while trying to ping the server");
	}
};

// eslint-disable-next-line max-len
export default { postRegisterAuthentication, postDeleteAuthentication, postLoginAuthentication, postResendAuthentication, postChangePasswordAuthentication, postChangeEmailAuthentication, postVerifyEmailAuthentication, postRecoveryPwdSendCodeAuthentication, postRecoveryPwdChangePwdAuthentication, getPing };
