import { BaseEntity } from "domain/entities/base.entity";

interface ContentMail {
	title: string;
	text: string;
	buttonUrl?: string;
	buttonText?: string;
}

export class SendMailEntity extends BaseEntity {
	email: string;
	subject: string;
	content: ContentMail;

	constructor() {
		super();

		this.email = undefined;
		this.subject = undefined;
		this.content = undefined;
	}
}
