import { BaseEntity } from "domain/entities/base.entity";

export class TagEntity extends BaseEntity {
    name: string;

    constructor() {
		super();

        this.name = undefined;
    }
}