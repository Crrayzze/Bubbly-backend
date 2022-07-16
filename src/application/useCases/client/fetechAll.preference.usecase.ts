import { AbstractPreferenceRepository } from "application/repositories/preference.repository.abstract";

import { PreferenceEntity } from "domain/entities/preference.entity";

import { UseCaseInterface } from "application/useCases/usecase.interface";

export class FetchAllSearchUseCase implements UseCaseInterface {
	private repo: AbstractPreferenceRepository;

	constructor(repo: AbstractPreferenceRepository) {
		this.repo = repo;
	}

	async execute(): Promise<PreferenceEntity[]> {
		try {
			return (await this.repo.getPreference());
		} catch (err) {
			throw err;
		}
	}
}