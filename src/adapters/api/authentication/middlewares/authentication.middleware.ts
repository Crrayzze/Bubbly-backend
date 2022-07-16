import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { ErrorHandling } from "adapters/api/errorHandling/utils/errorHandling.utils";

import { AuthenticatedRequest } from "adapters/api/authentication/requests/authenticated.request";
import { AuthenticateUserTokenUseCase } from "application/useCases/authentication/authenticate.userToken.usecase";

import { UserEntity } from "domain/entities/user.entity";

const validAuth = async (req: FastifyRequest<AuthenticatedRequest>, reply: FastifyReply, server: FastifyInstance): Promise<void> => {
	try {
		const middlewareUseCase: AuthenticateUserTokenUseCase = new AuthenticateUserTokenUseCase(
			req.headers.authorization,
			server.authenticationRepository,
			server.usersTagRepository,
			server.videoRepository
		);
		const userEntity: UserEntity = await middlewareUseCase.execute();

		if (!req.body) {
			req.body = {};
		}
		req.body["authUser"] = userEntity;
		req.query["authUser"] = userEntity;
	} catch(err) {
		throw ErrorHandling.createApplicationError(err, "Access forbiden");
	}
};

export default { validAuth };
