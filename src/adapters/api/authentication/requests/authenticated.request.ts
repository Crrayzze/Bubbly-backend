import { UserEntity } from "domain/entities/user.entity";

export interface AuthenticatedRequest {
	Headers?: {
		authorization?: string;
	};
}

export interface AuthenticatedRequestBody extends AuthenticatedRequest {
	Body: {
		authUser: UserEntity;
	};
}
