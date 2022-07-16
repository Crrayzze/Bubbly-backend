import { AbstractGenreRepository } from "application/repositories/genre.repository.abstract";
import { UseCaseInterface } from "application/useCases/usecase.interface";

import { GenreEntity } from "domain/entities/genre.entity";

export class GetGenreByIdUseCase implements UseCaseInterface {
	private repo: AbstractGenreRepository;
	private id: string;

	constructor(repo: AbstractGenreRepository, id: string) {
		this.repo = repo;
		this.id = id;
	}

	async execute(): Promise<GenreEntity> {
		try {
			return await this.repo.getById(this.id);
		} catch (err) {
			throw err;
		}
	}
}
