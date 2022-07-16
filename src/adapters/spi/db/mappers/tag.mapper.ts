import { DbMapper } from "application/mappers/db.mapper";

import { TagModel } from "adapters/spi/db/models/tag.model";

import { TagEntity } from "domain/entities/tag.entity";

export class TagMapper implements DbMapper<TagEntity, TagModel> {
    toEntity(model: TagModel): TagEntity {
        const entity: TagEntity = {
            id: model.id,
            name: model.name
        };
        return entity;
    }

    toModel(entity: TagEntity): TagModel {
        const model: TagModel = new TagModel();

        model.createDate = new Date();
        model.updateDate = new Date();
        model.id = entity.id;
        model.name = entity.name;

        return model;
    }
}