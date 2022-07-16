import { Transporter, createTransport } from "nodemailer";

export const SendMailConfig: Transporter = createTransport({
	host: "pro2.mail.ovh.net",
	port: 587,
	auth: {
		user: "bubbly@mvetois.fr",
		pass: "Rennes2023"
	}
});
