import { BasePayloadEntity } from "domain/payloads/base.payload.entity";

export interface ProfileDescriptionPayload extends BasePayloadEntity {
	description: string;
}
