/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-explicit-any */
// importer librairie si besoin

import { AbstractLoadVideoRepository } from "application/repositories/loadVideo.repository.abstract";

import { GenericError } from "domain/errors/generic.error.entity";
import { Multipart } from "fastify-multipart";

import fs from 'fs';
import util from 'util';
import { pipeline } from 'stream';
const pump = util.promisify(pipeline)

const folder = "videos/";


export class LoadVideoRepository implements AbstractLoadVideoRepository {

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	constructor() {
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async uploadVideo(video: Multipart, date: Date): Promise<string> {
		try {
			await pump(video.file, fs.createWriteStream(folder + date.getFullYear() + "." + (date.getMonth() + 1) + "." + date.getDate() + "-" + video.filename))
    		return folder + date + video.filename;
		} catch {
			throw new GenericError("Something went wrong while uploading the video");
		}
	}
}
