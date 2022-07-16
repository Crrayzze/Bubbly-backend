import { AbstractTagRepository } from "application/repositories/tag.repository.abstract";
import { UseCaseInterface } from "application/useCases/usecase.interface";

import { TagEntity } from "domain/entities/tag.entity";

export class FetchAllTagsUseCase implements UseCaseInterface {
	private repo: AbstractTagRepository;

	constructor(repo: AbstractTagRepository) {
		this.repo = repo;
	}

	async execute(): Promise<TagEntity[]> {
		try {
			return (await this.repo.getTag());
		} catch (err) {
			throw err;
		}
	}
}
