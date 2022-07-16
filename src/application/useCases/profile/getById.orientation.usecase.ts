import { AbstractOrientationRepository } from "application/repositories/orientation.repository.abstract";
import { UseCaseInterface } from "application/useCases/usecase.interface";

import { OrientationEntity } from "domain/entities/orientation.entity";

export class GetOrientationByIdUseCase implements UseCaseInterface {
	private repo: AbstractOrientationRepository;
	private id: string;

	constructor(repo: AbstractOrientationRepository, id: string) {
		this.repo = repo;
		this.id = id;
	}

	async execute(): Promise<OrientationEntity> {
		try {
			return await this.repo.getById(this.id);
		} catch (err) {
			throw err;
		}
	}
}
