import { UseCaseInterface } from "application/useCases/usecase.interface";
import { PreferenceEntity } from "domain/entities/preference.entity";
import { AbstractPreferenceRepository } from "application/repositories/preference.repository.abstract";

export class UpdatePreferenceUseCase implements UseCaseInterface {
	private preference: PreferenceEntity;
	private repo: AbstractPreferenceRepository;

	constructor(preference: PreferenceEntity, repo: AbstractPreferenceRepository) {
		this.preference = preference;
		this.repo = repo;
	}

	async execute(): Promise<void> {
		try {
			await this.repo.updatePreference(this.preference);
		} catch (err) {
			throw err;
		}
	}
}