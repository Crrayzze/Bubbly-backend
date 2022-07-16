import { AbstractSearchRepository } from "application/repositories/search.repository.abstract";
import { UseCaseInterface } from "application/useCases/usecase.interface";

import { SearchEntity } from "domain/entities/search.entity";

export class GetSearchByIdUseCase implements UseCaseInterface {
	private repo: AbstractSearchRepository;
	private id: string;

	constructor(repo: AbstractSearchRepository, id: string) {
		this.repo = repo;
		this.id = id;
	}

	async execute(): Promise<SearchEntity> {
		try {
			return await this.repo.getById(this.id);
		} catch (err) {
			throw err;
		}
	}
}