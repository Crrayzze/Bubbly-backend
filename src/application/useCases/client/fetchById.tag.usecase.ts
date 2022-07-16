import { AbstractTagRepository } from "application/repositories/tag.repository.abstract";
import { UseCaseInterface } from "application/useCases/usecase.interface";

import { TagEntity } from "domain/entities/tag.entity";

export class FetchTagByIdUseCase implements UseCaseInterface {
	private repo: AbstractTagRepository;
    private id: string;

	constructor(repo: AbstractTagRepository, id: string) {
		this.repo = repo;
        this.id = id;
	}

	async execute(): Promise<TagEntity> {
		try {
			return (await this.repo.getTagById(this.id));
		} catch (err) {
			throw err;
		}
	}
}
