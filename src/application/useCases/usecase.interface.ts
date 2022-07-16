import { BaseEntity } from "domain/entities/base.entity";

export interface UseCaseInterface {
	execute(): Promise<BaseEntity | BaseEntity[] | void>;
}
