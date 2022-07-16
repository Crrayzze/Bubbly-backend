import { GenreEntity } from "domain/entities/genre.entity";

export interface AbstractGenreRepository {
	getGenre(): Promise<GenreEntity[]>;
	getById(id: string): Promise<GenreEntity>;
}
