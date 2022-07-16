import { EntityManager } from "typeorm";

import { TagModel } from "adapters/spi/db/models/tag.model";
import { TagMapper } from "adapters/spi/db/mappers/tag.mapper";

import { AbstractTagRepository } from "application/repositories/tag.repository.abstract";
import { DbMapper } from "application/mappers/db.mapper";

import { TagEntity } from "domain/entities/tag.entity";
import { GenericError } from "domain/errors/generic.error.entity";

export class TagRepository implements AbstractTagRepository {
    private entityManager: EntityManager;
    private mapper: DbMapper<TagEntity, TagModel>;

    constructor(entityManager: EntityManager) {
        this.entityManager = entityManager;
        this.mapper = new TagMapper();
    }

    async getTag(): Promise<TagEntity[]> {
        try {
          const datas: TagModel[] = await this.entityManager.getRepository(TagModel).find();
          
          let entities: TagEntity[] = [];
          for (const data of datas) {
            entities.push(this.mapper.toEntity(data));
          }

          return (entities);
        } catch {
          throw new GenericError("Cannot fetch tags");
        }
    }

    async getTagById(id: string): Promise<TagEntity> {
      try {
        const data: TagModel = await this.entityManager.getRepository(TagModel).findOneOrFail({ id });
        return this.mapper.toEntity(data);
      } catch {
        throw new GenericError("Cannot fetch tags");
      }
  }

}