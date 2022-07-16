import { PrimaryGeneratedColumn, Column } from "typeorm";

import { BaseModelEntity } from "domain/models/base.model.entity";

export class BaseModel extends BaseModelEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ name: "create_date", type: "timestamp" })
	createDate: Date;

	@Column({ name: "update_date", type: "timestamp" })
	updateDate: Date;
}
