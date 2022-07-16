import { BaseEntity } from "domain/entities/base.entity";
import { BasePayloadEntity } from "domain/payloads/base.payload.entity";
import { BasePresenter } from "domain/presenters/base.presenter";

export interface ApiMapper<T extends BaseEntity | Error, P extends BasePresenter, R extends BasePayloadEntity> {
	toEntity(docObj: R): T;
	toApi(entityObj: T): P;
}
