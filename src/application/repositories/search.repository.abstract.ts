import { SearchEntity } from "domain/entities/search.entity";

export interface AbstractSearchRepository {
	getSearch(): Promise<SearchEntity[]>;
	getById(id: string): Promise<SearchEntity>;
}
