import { SendMailEntity } from "domain/entities/sendMail.entity";

export interface AbstractSendMailRepository {
	sendMail(sendMailEntity: SendMailEntity): Promise<boolean>;
}
