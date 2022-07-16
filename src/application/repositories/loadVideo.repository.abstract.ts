import { Multipart } from "fastify-multipart";

export interface AbstractLoadVideoRepository {
	uploadVideo(video: Multipart, date: Date): Promise<string>;
}
