import { Transporter } from "nodemailer";

import { AbstractSendMailRepository } from "application/repositories/sendMail.repository.abstract";

import { SendMailEntity } from "domain/entities/sendMail.entity";

import fs from "fs";
import handlebars from "handlebars";
import { MailOptions } from "nodemailer/lib/json-transport";

export class SendMailRepository implements AbstractSendMailRepository {
	private transporter: Transporter;

	constructor(transporter: Transporter) {
		this.transporter = transporter;
	}

	async readFile(path: string): Promise<string> {
		const buffer: Buffer = await fs.promises.readFile(path);
		return (buffer.toString());
	}

	async sendMail(sendMailEntity: SendMailEntity): Promise<boolean> {
		const mailPath: string = __dirname + "/../email/";
		const file: string = await this.readFile(__dirname + "/../email/standard.html");
		// eslint-disable-next-line @typescript-eslint/typedef
		handlebars.registerHelper("ifbutton", (arg) => {
			if (arg) {
				return (
					new handlebars.SafeString("<a href=" + sendMailEntity.content.buttonUrl +
                     "><button style='border: 2px solid #383e42; background-color: white; color: black;" + 
                     "padding: 14px 28px; font-size: 16px; cursor: pointer; border-color: #383e42;" + 
                     "color: #383e42; border-radius: 5px;'>" + 
                     sendMailEntity.content.buttonText + "</button></a>"));
			}
			return (new handlebars.SafeString(" "));
		});
		const template: HandlebarsTemplateDelegate<unknown> = handlebars.compile(file);
		const replacements: {title: string; text: string; button: boolean}  = {
			title: sendMailEntity.content.title,
			text: sendMailEntity.content.text,
			button: (sendMailEntity.content.buttonUrl !== undefined && sendMailEntity.content.buttonText !== undefined) ? true : false
		};
		const htmlToSend: string = template(replacements);
		const mailOptions: MailOptions = {
			from: "Bubbly <" + "bubbly@mvetois.fr" + ">",
			to: sendMailEntity.email,
			subject: sendMailEntity.subject,
			html : htmlToSend,
			attachments: [
				{
					path: mailPath + "/img/logo/BubblyWhite.png",
					cid: "BubblyLogo",
					contentDisposition: "inline"
				},
				{
					path: mailPath + "/img/social/facebook.png",
					cid: "BubblyFacebook",
					contentDisposition: "inline"
				},
				{
					path: mailPath + "/img/social/instagram.png",
					cid: "BubblyInstagram",
					contentDisposition: "inline"
				},
				{
					path: mailPath + "/img/social/linkedin.png",
					cid: "BubblyLinkedin",
					contentDisposition: "inline"
				},
				{
					path: mailPath + "/img/social/twitter.png",
					cid: "BubblyTwitter",
					contentDisposition: "inline"
				}
			]
		};
		this.transporter.sendMail(mailOptions, (error: Error) => {
			if (error) {
				console.log(error);
			}
		});
		return (true);
	}
}
