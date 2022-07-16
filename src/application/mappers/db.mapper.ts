import { BaseEntity } from "domain/entities/base.entity";
import { BaseModelEntity } from "domain/models/base.model.entity";

export interface DbMapper<T extends BaseEntity, P extends BaseModelEntity> {
	toEntity(modelObj: P): T;
	toModel(entityObj: T): P;
}
