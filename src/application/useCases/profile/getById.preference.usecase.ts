import { AbstractPreferenceRepository } from "application/repositories/preference.repository.abstract";
import { UseCaseInterface } from "application/useCases/usecase.interface";

import { PreferenceEntity } from "domain/entities/preference.entity";

export class GetPreferenceByIdUseCase implements UseCaseInterface {
	private repo: AbstractPreferenceRepository;
	private id: string;

	constructor(repo: AbstractPreferenceRepository, id: string) {
		this.repo = repo;
		this.id = id;
	}

	async execute(): Promise<PreferenceEntity> {
		try {
			return await this.repo.getById(this.id);
		} catch (err) {
			throw err;
		}
	}
}