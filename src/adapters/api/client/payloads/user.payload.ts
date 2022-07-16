import { BasePayloadEntity } from "domain/payloads/base.payload.entity";

export interface UserPayload extends BasePayloadEntity {
	userId: string;
}
