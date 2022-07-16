import fp from "fastify-plugin";
import { FastifyError, FastifyInstance } from "fastify";
import "reflect-metadata";

import { UserRepository } from "adapters/spi/db/repositories/user.repository";
import { AuthenticationRepository } from "adapters/spi/db/repositories/authentication.repository";
import { ProfileDataRepository } from "adapters/spi/db/repositories/profileData.repository";
import { TagRepository } from "adapters/spi/db/repositories/tag.repository";
import { UsersTagRepository } from "../db/repositories/usersTag.repository";

import { SendMailRepository } from "adapters/spi/utils/repositories/sendMail.repository";
import { OrientationRepository } from "../db/repositories/orientation.repository";
import { GenreRepository } from "../db/repositories/genre.repository";
import { SearchRepository } from "../db/repositories/search.repository";
import { PreferenceRepository } from "../db/repositories/preference.repository";
import { LikeRepository } from "../db/repositories/like.repository";
import { LoadVideoRepository } from "../utils/repositories/loadVideo.repository";
import { VideoRepository } from "../db/repositories/video.repository";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default fp((server: FastifyInstance, opts: any, next: (err?: FastifyError) => void): void => {
	try {

		const userRepository: UserRepository = new UserRepository(server.orm.manager);
		server.decorate("userRepository", userRepository);

		const authenticationRepository: AuthenticationRepository = new AuthenticationRepository(server.orm.manager);
		server.decorate("authenticationRepository", authenticationRepository);

		const profileDataRepository: ProfileDataRepository = new ProfileDataRepository(server.orm.manager);
		server.decorate("profileDataRepository", profileDataRepository);

		const tagRepository: TagRepository = new TagRepository(server.orm.manager);
		server.decorate("tagRepository", tagRepository);

		const usersTagRepository: UsersTagRepository = new UsersTagRepository(server.orm.manager);
		server.decorate("usersTagRepository", usersTagRepository);

		const orientationRepository: OrientationRepository = new OrientationRepository(server.orm.manager);
		server.decorate("orientationRepository", orientationRepository);

		const preferenceRepository: PreferenceRepository = new PreferenceRepository(server.orm.manager);
		server.decorate("preferenceRepository", preferenceRepository);

		const searchRepository: SearchRepository = new SearchRepository(server.orm.manager);
		server.decorate("searchRepository", searchRepository);

		const genreRepository: GenreRepository = new GenreRepository(server.orm.manager);
		server.decorate("genreRepository", genreRepository);

		const likeRepository: LikeRepository = new LikeRepository(server.orm.manager);
		server.decorate("likeRepository", likeRepository);

		const videoRepository: VideoRepository = new VideoRepository(server.orm.manager);
		server.decorate("videoRepository", videoRepository);

		const sendMailRepository: SendMailRepository =  new SendMailRepository(server.sendMailClient);
		server.decorate("sendMailRepository", sendMailRepository);

		const loadVideoRepository: LoadVideoRepository = new LoadVideoRepository();
		server.decorate("loadVideoRepository", loadVideoRepository);

		return next();
	} catch (err) {
		console.error(err);
		return next(err);
	}
});
