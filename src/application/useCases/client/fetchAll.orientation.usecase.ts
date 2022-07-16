import { AbstractOrientationRepository } from "application/repositories/orientation.repository.abstract";

import { OrientationEntity } from "domain/entities/orientation.entity";

import { UseCaseInterface } from "application/useCases/usecase.interface";

export class FetchAllOrientationUseCase implements UseCaseInterface {
	private repo: AbstractOrientationRepository;

	constructor(repo: AbstractOrientationRepository) {
		this.repo = repo;
	}

	async execute(): Promise<OrientationEntity[]> {
		try {
			return (await this.repo.getOrientation());
		} catch (err) {
			throw err;
		}
	}
}
