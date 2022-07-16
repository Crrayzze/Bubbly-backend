import { HttpAuth } from "adapters/spi/shared/utils/httpAuth";
import { Transporter } from "nodemailer";
import { Connection } from "typeorm";

import { AbstractUserRepository } from "application/repositories/user.repository.abstract";
import { AbstractAuthenticationRepository } from "application/repositories/authentication.repository.abstract";
import { AbstractProfileDataRepository } from "application/repositories/profileData.repository.abstract";
import { AbstractTagRepository } from "application/repositories/tag.repository.abstract";
import { AbstractUsersTagRepository } from "application/repositories/usersTag.repository.abstract";

import { SendMailRepository } from "adapters/spi/utils/repositories/sendMail.repository";
import { AbstractOrientationRepository} from "application/repositories/orientation.repository.abstract";
import { AbstractSearchRepository} from "application/repositories/search.repository.abstract";
import { AbstractGenreRepository } from "application/repositories/genre.repository.abstract";
import { AbstractLikerepository } from "application/repositories/like.repository.abstract";
import { AbstractLoadVideoRepository } from "application/repositories/loadVideo.repository.abstract";
import { AbstractVideoRepository } from "application/repositories/video.repository.abstract";
import { AbstractPreferenceRepository } from "application/repositories/preference.repository.abstract";

declare module "fastify" {
	export interface FastifyInstance {
		httpClient: HttpAuth;
		sendMailClient: Transporter;
		orm: Connection;

		userRepository: AbstractUserRepository;
		authenticationRepository: AbstractAuthenticationRepository;
		profileDataRepository: AbstractProfileDataRepository;
		likeRepository: AbstractLikerepository;
		tagRepository: AbstractTagRepository;
		usersTagRepository: AbstractUsersTagRepository;
		orientationRepository: AbstractOrientationRepository;
		genreRepository: AbstractGenreRepository;
		videoRepository: AbstractVideoRepository;
		searchRepository: AbstractSearchRepository;
		preferenceRepository: AbstractPreferenceRepository;
		
		sendMailRepository: SendMailRepository;
		loadVideoRepository: AbstractLoadVideoRepository;
	}
}
