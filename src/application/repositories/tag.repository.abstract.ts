import { TagEntity } from "domain/entities/tag.entity";

export interface AbstractTagRepository {
    getTag(): Promise<TagEntity[]>;
    getTagById(id: string): Promise<TagEntity>;

}