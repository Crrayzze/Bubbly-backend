import { UseCaseInterface } from "application/useCases/usecase.interface";
import { GenericResponseEntity } from "domain/entities/genericResponse.entity";
import { VideoEntity } from "domain/entities/video.entity";

import { AbstractVideoRepository } from "application/repositories/video.repository.abstract";
import { AbstractLoadVideoRepository } from "application/repositories/loadVideo.repository.abstract";
import { ProfileDataEntity } from "domain/entities/profileData.entity";
import { Multipart } from "fastify-multipart";

export class PostVideoUseCase implements UseCaseInterface {
	private video: Multipart;
	private profile: ProfileDataEntity;
	private repo: AbstractVideoRepository;
	private loadRepo: AbstractLoadVideoRepository;

	constructor(repo: AbstractVideoRepository, loadRepo: AbstractLoadVideoRepository, video: Multipart, profile: ProfileDataEntity) {
		this.repo = repo;
		this.loadRepo = loadRepo;
		this.video = video;
		this.profile = profile;
	}

	async execute(): Promise<GenericResponseEntity> {

		const folder: string = "videos/";

		try {
			const date: Date = new Date();
			const videoUrl: string = await this.loadRepo.uploadVideo(this.video, date); 
            
			// Post url dans le profil
			const videoEntity: VideoEntity = { publishDate: date, url: videoUrl, profile: this.profile };
			await this.repo.postVideo(videoEntity);
			return new GenericResponseEntity(folder + date.getFullYear() + "." + (date.getMonth() + 1) + "." + date.getDate() + "-" + this.video.filename);
		} catch (err) {
			throw err;
		}
	}
}
