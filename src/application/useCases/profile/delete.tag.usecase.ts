import { UseCaseInterface } from "application/useCases/usecase.interface";
import { AbstractUsersTagRepository } from "application/repositories/usersTag.repository.abstract";

export class DeleteTagUseCase implements UseCaseInterface {
	private repo: AbstractUsersTagRepository;
	private id: string;

	constructor(id: string, repo: AbstractUsersTagRepository) {
		this.repo = repo;
		this.id = id;
	}

	async execute(): Promise<void> {
		try {
			await this.repo.delete(this.id);
		} catch (err) {
			throw err;
		}
	}
}
