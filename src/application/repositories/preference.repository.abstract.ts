import { PreferenceEntity } from "domain/entities/preference.entity";

export interface AbstractPreferenceRepository {
	getPreference(): Promise<PreferenceEntity[]>;
	updatePreference(preference: PreferenceEntity): Promise<PreferenceEntity>;
	getById(id: string): Promise<PreferenceEntity>;
}
