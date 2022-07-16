import { AbstractSearchRepository } from "application/repositories/search.repository.abstract";

import { SearchEntity } from "domain/entities/search.entity";

import { UseCaseInterface } from "application/useCases/usecase.interface";

export class FetchAllSearchUseCase implements UseCaseInterface {
	private repo: AbstractSearchRepository;

	constructor(repo: AbstractSearchRepository) {
		this.repo = repo;
	}

	async execute(): Promise<SearchEntity[]> {
		try {
			return (await this.repo.getSearch());
		} catch (err) {
			throw err;
		}
	}
}
