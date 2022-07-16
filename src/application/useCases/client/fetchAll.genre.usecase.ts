import { GenreEntity } from "domain/entities/genre.entity";

import { UseCaseInterface } from "application/useCases/usecase.interface";
import { AbstractGenreRepository } from "application/repositories/genre.repository.abstract";

export class FetchAllGenreUseCase implements UseCaseInterface {
	private repo: AbstractGenreRepository;

	constructor(repo: AbstractGenreRepository) {
		this.repo = repo;
	}

	async execute(): Promise<GenreEntity[]> {
		try {
			return (await this.repo.getGenre());
		} catch (err) {
			throw err;
		}
	}
}
